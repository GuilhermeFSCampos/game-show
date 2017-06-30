import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import ScoreGraph from './ScoreGraph'
import ScoreAdmin from './ScoreAdmin'
import AudioController from './AudioController'

const Routes = () => {
  return (
    <Router>
      <div>
        <Route exact path={'/'} component={ScoreGraph} />
        <Route exact path={'/scoreboardAdmin'} component={ScoreAdmin} />
        <Route exact path={'/AudioController'} component={AudioController}/>
      </div>
    </Router>
  )
}

export default Routes
