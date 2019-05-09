import { storiesOf } from '@storybook/react';
import Button from 'Components/Button';
import Next from 'Images/arrow-next.svg';
import Prev from 'Images/arrow-prev.svg';
import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

const backgroundImage =
  'repeating-linear-gradient(30deg, hsla(0, 0%, 100%, .1), hsla(0, 0%, 100%, .1) 15px, transparent 0, transparent 30px)';

storiesOf('Button', module).add('Regular button', () => (
  <BrowserRouter>
    <Button label="Everything is fine" />
  </BrowserRouter>
));

storiesOf('Button', module).add('Negative button', () => (
  <BrowserRouter>
    <div style={{ width: '200px', height: '100px', background: '#58a', backgroundImage }}>
      <Button label="Everything sucks :(" type="negative" />
    </div>
  </BrowserRouter>
));

storiesOf('Button', module).add('Button link', () => (
  <BrowserRouter>
    <Button href="https://www.surfingdirt.com" label="Surfing Dirt" />
  </BrowserRouter>
));

storiesOf('Button', module).add('Link - new tab', () => (
  <BrowserRouter>
    <Button href="https://www.onrewind.com" targetBlank label="New tab" />
  </BrowserRouter>
));

storiesOf('Button', module).add('Large button', () => (
  <BrowserRouter>
    <Button label="Big button" type="large" />
  </BrowserRouter>
));

storiesOf('Button', module).add('Disabled button', () => (
  <BrowserRouter>
    <Button label="Disabled" disabled />
  </BrowserRouter>
));

storiesOf('Button', module).add('Loading button', () => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);

      this.state = { loading: false };
    }

    toggle() {
      this.setState({ loading: !this.state.loading });
    }

    render() {
      return (
        <div>
          <button onClick={this.toggle} type="button">
            Toggle loading
          </button>
          <Button label="Ready" loading={this.state.loading} />
        </div>
      );
    }
  }

  return (
    <BrowserRouter>
      <Fragment>
        <div>
          <Button label="Disabled" disabled loading />
        </div>
        <div>
          <Wrapper />
        </div>
      </Fragment>
    </BrowserRouter>
  );
});

storiesOf('Button', module).add('Buttons with icons - RTL', () => (
  <BrowserRouter>
    <ul>
      <li>
        <p>LTR:</p>
        <Button label="With next icon" iconRight={Next} />
      </li>
      <li>
        <p>RTL:</p>
        <div dir="rtl">
          <Button label="With next icon" iconRight={Next} />
        </div>
      </li>
      <li>
        <p>LTR:</p>
        <Button label="With prev icon" iconLeft={Prev} />
      </li>
      <li>
        <p>RTL:</p>
        <div dir="rtl">
          <Button label="With prev icon" iconLeft={Prev} />
        </div>
      </li>
      <li>
        <p>LTR:</p>
        <Button label="With both icons" iconLeft={Prev} iconRight={Next} />
      </li>
      <li>
        <p>RTL:</p>
        <div dir="rtl">
          <Button label="With both icons" iconLeft={Prev} iconRight={Next} />
        </div>
      </li>
    </ul>
  </BrowserRouter>
));
