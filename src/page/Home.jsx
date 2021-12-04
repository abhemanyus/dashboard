import React, {memo, useContext} from 'react'
import { UserContext } from '../App'
import Counter from '../component/Counter'
import UserList from '../component/UserList'

function Home() {
    const {UserState} = useContext(UserContext)
    return (
        <div>
            <Counter count={UserState.Count}/>
            <UserList users={UserState.Users}/>
        </div>
    )
}

export default memo(Home)
