import React from 'react'

import { Route, Switch } from 'react-router-dom'
import NotFound from './../components/NotFound'

import { useQuery } from 'react-apollo-hooks'

import gql from 'graphql-tag'

import AuthRoute from './../components/AuthRoute'
import AuthLayout from './../components/layout/AuthLayout'

import Feed from './../components/post/Feed'
import Drafts from './../components/post/Drafts'
import PostCreate from './../components/post/PostCreate'
import PostDetail from './../components/post/PostDetail'
import PostEdit from './../components/post/PostEdit'
import Profile from './../components/user/Profile'

import MeQueryContext, { MeQueryResponse } from './../context/MeQueryContext'

const RoutesAuth: React.FC = () => {
  const meQuery = useQuery<MeQueryResponse>(ME_QUERY)

  return (
    <MeQueryContext.Provider value={meQuery}>
      <AuthLayout>
        <Switch>
          <AuthRoute exact path="/" component={Feed} />
          <AuthRoute exact path="/drafts" component={Drafts} />
          <AuthRoute exact path="/create" component={PostCreate} />
          <AuthRoute path="/post/:id/edit" component={PostEdit} />
          <AuthRoute path="/post/:id" component={PostDetail} />
          <AuthRoute path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </AuthLayout>
    </MeQueryContext.Provider>
  )
}

const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      role
    }
  }
`

export default RoutesAuth
