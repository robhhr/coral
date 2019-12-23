import React, {useState} from 'react'
import withUser from '../../hocs/withUser'
import {withUsers, withNotes} from '../../hocs'
import {Skeleton, Icon, List, Card, Typography, Tabs} from 'antd'
const {Title, Text} = Typography
const {TabPane} = Tabs
import Gravatar from 'react-gravatar'
import {Layout} from '../../components'
import EditableProfileInfo from '../../components/EditableProfileInfo'
import ChangePasswordForm from '../../components/ChangePasswordForm'
import {useHistory} from 'react-router'
import {
  backButton,
  card,
  info,
  gravatar,
  dashed,
  notesList,
} from './Profile.styles'
import ProfileTab from '../../components/ProfileTab'

const Profile = ({
  users,
  user,
  username: profileUsername,
  email,
  notes,
  favoriteNotes,
  sharedNotes,
  author,
}) => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  return user ? (
    <Layout>
      <Icon
        style={backButton}
        onClick={() => history.push('/')}
        type="arrow-left"
      />
      <Card style={card} loading={loading}>
        <Gravatar
          style={gravatar}
          default="monsterid"
          email={email}
        />
        <EditableProfileInfo
          iconType="user"
          style={info}
          onSave={'users.updateUserName'}
          value={profileUsername}
        />
        <EditableProfileInfo
          iconType="mail"
          style={info}
          onSave={'users.updateEmail'}
          type="email"
          value={email}
        />
        <ChangePasswordForm />
        <section style={dashed}>
          <Text strong>
            Your collaborators <Icon type="team" />
          </Text>
          {users
            .filter(({_id}) => !(author === _id))
            .map(({_id, username}) =>
              username === profileUsername ? null : (
                <List.Item key={_id}>{username}</List.Item>
              ),
            )}
        </section>
        <section style={dashed}>
          <Text strong>
            Your favorite notes <Icon type="star" />
          </Text>
          {favoriteNotes.map(({_id, title}) => (
            <List.Item key={_id}>{title}</List.Item>
          ))}
        </section>
      </Card>
      <Card style={card}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Your notes" key="1">
            <ProfileTab noteType={notes} style={notesList} />
          </TabPane>
          <TabPane tab="Shared notes" key="2">
            <ProfileTab noteType={sharedNotes} style={notesList} />
          </TabPane>
        </Tabs>
      </Card>
    </Layout>
  ) : (
    <p>loading...</p>
  )
}
export default withUser(withUsers(withNotes(Profile)))
