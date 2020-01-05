import React from 'react'
import {useHistory} from 'react-router'
import {css} from 'aphrodite'
import {withUser, withUsers, withNotes} from '../../hocs'
import {useTheme} from '../../hooks'
import {Icon, List, Card, Typography, Tabs} from 'antd'
const {Text} = Typography
const {TabPane} = Tabs
import Gravatar from 'react-gravatar'
import {Layout, ThemeToggle} from '../../components'
import EditableText from '../../components/EditableText'
import ChangePasswordForm from '../../components/ChangePasswordForm'
import ProfileTab from '../../components/ProfileTab'
import styles from './Profile.styles'

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
  const [theme] = useTheme()
  const history = useHistory()

  return user ? (
    <Layout>
      <Icon
        className={css(styles.backButton)}
        onClick={() => history.push('/')}
        type="arrow-left"
      />
      <main className={css(styles.container)}>
        <Card
          className={
            theme === 'light'
              ? css(styles.card)
              : css([styles.card, styles.cardDark])
          }
        >
          <Gravatar
            className={css(styles.gravatar)}
            default="monsterid"
            email={email}
          />
          <EditableText
            className={css(styles.info)}
            iconType="user"
            onSave={'users.updateUserName'}
          />
          <EditableText
            className={css(styles.info)}
            iconType="mail"
            onSave={'users.updateEmail'}
            type="email"
            value={email}
          />
          <ChangePasswordForm />
          <section className={css(styles.dashed)}>
            <ThemeToggle />
          </section>
          <section className={css(styles.dashed)}>
            <Text
              strong
              className={
                theme === 'light' ? {} : css(styles.textDarkBg)
              }
            >
              Your collaborators <Icon type="team" />
            </Text>
            {users
              .filter(({_id}) => !(author === _id))
              .map(({_id, username}) =>
                username === profileUsername ? null : (
                  <List.Item
                    key={_id}
                    className={
                      theme === 'light' ? {} : css(styles.textDarkBg)
                    }
                  >
                    {username}
                  </List.Item>
                ),
              )}
          </section>
          <section className={css(styles.dashed)}>
            <Text
              strong
              className={
                theme === 'light' ? {} : css(styles.textDarkBg)
              }
            >
              Your favorite notes <Icon type="star" />
            </Text>
            {favoriteNotes.map(({_id, title}) => (
              <List.Item
                key={_id}
                className={
                  theme === 'light' ? {} : css(styles.textDarkBg)
                }
              >
                {title}
              </List.Item>
            ))}
          </section>
        </Card>
        <Card
          className={
            theme === 'light'
              ? css([styles.card, styles.tabCard])
              : css([styles.card, styles.cardDark, styles.tabCard])
          }
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Your notes" key="1">
              <ProfileTab
                style={css(styles.notesList)}
                noteType={notes}
              />
            </TabPane>
            <TabPane tab="Shared notes" key="2">
              <ProfileTab
                style={css(styles.notesList)}
                noteType={sharedNotes}
              />
            </TabPane>
          </Tabs>
        </Card>
      </main>
    </Layout>
  ) : null
}
export default withUser(withUsers(withNotes(Profile)))
