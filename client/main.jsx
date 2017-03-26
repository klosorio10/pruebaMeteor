import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';

import App from '../imports/ui/App.jsx';
import Image from '../imports/ui/image.jsx';
import './main.css';

Meteor.startup(() => {
   render(<App/>, document.getElementById('root'));
});
