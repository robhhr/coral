import {StyleSheet} from 'aphrodite'

const sideMenuSharedStyles = {
  minHeight: '100vh',
}

export const sideMenuStyles = {
  light: {
    ...sideMenuSharedStyles,
  },
  dark: {
    backgroundColor: '#0a0a0a',
    ...sideMenuSharedStyles,
  },
  solarized: {
    backgroundColor: '#002140',
  },
}

export const sideMenuContentStyles = {
  light: {},
  dark: {
    backgroundColor: '#0a0a0a',
  },
  solarized: {
    backgroundColor: '#002140',
  },
}

const styles = StyleSheet.create({
  logoSidemenu: {
    height: '100%',
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default styles
