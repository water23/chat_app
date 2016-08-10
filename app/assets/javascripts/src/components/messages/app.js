import React from 'react'
import _ from 'lodash'
import MessagesStore from '../../stores/messages'
import CurrentUserStore from '../../stores/currentUser'
import UserList from './userList'
import MessagesBox from './messagesBox'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    const openChatID = MessagesStore.getOpenChatUserId()
    const currentUser = CurrentUserStore.getCurrentUser()
    if (!currentUser) return {}
    const currentUserMessages = currentUser.messages ? currentUser.messages : []
    const users = MessagesStore.getUserMessages()
    if (!users) return {}
    const openUserMessages = users.messages ? users.messages : []
    const allMessages = _.concat(currentUserMessages, openUserMessages)
    const messages = _.sortBy(allMessages, (message) => { return message.created_at })

    return {
      currentUser,
      openChatID,
      messages,
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
    CurrentUserStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
    CurrentUserStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  render() {
    return (
        <div className='app'>
          <UserList />
          <MessagesBox {...this.state} />
        </div>
      )
  }
}

export default App