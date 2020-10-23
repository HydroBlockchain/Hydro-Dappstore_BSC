import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Footer from '.';

storiesOf('Footer', module)
  .add('Standard', () => <Footer />);
