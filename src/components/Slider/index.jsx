import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { NEXT, PREVIOUS } = icons;

const RTL = 'rtl';
const FORWARD = 'forward';
const BACK = 'back';

const INITIAL_STATE = {
  targetIndex: 0,
  targetPosition: 0,
  touching: false,
  mounted: false,
  isAtBeginning: true,
  isAtEnd: false,
  overflows: false,
};
const INITIAL_QUICK_STATE = {
  swipeTranslateX: null,
  touchStartX: null,
  touchMoveX: null,
};

const clamp = (min, value, max) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

class Slider extends React.PureComponent {
  static contextType = AppContext;

  static propTypes = {
    children: PropTypes.node.isRequired,
    t: PropTypes.func.isRequired,
    className: PropTypes.string,
    nextClassName: PropTypes.string,
    onSlideChange: PropTypes.func,
    prevClassName: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    nextClassName: null,
    onSlideChange: () => null,
    prevClassName: null,
  };

  constructor(props) {
    super(props);

    this.stepRefs = [];
    this.state = Object.assign({}, INITIAL_STATE);
    this.quickState = Object.assign({}, INITIAL_QUICK_STATE);

    this.performSlide = this.performSlide.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
  }

  componentDidMount() {
    const { scrollWidth, offsetWidth } = this.sliderEl;
    const overflows = scrollWidth > offsetWidth;

    this.setState({
      mounted: true,
      overflows,
    });
  }

  getTargetPosition(index) {
    const target = this.stepRefs[index];
    return Math.max(0, target.offsetLeft - this.stepRefs[0].offsetLeft);
  }

  setQuickState(updates) {
    this.quickState = Object.assign(this.quickState, updates);
  }

  updateSliderPosition(position) {
    this.sliderEl.style.transform = `translate(${-position}px)`;
  }

  touchStart(e) {
    const {
      state: { targetPosition },
    } = this;
    const { scrollWidth, offsetWidth } = this.sliderEl;
    const maxSwipe = scrollWidth - offsetWidth;
    const { clientX } = e.touches[0];
    this.setQuickState({
      touchStartX: clientX,
      touchMoveX: clientX,
      maxSwipe,
      currentSwipePosition: targetPosition,
    });
    this.setState({ touching: true });
  }

  touchMove(e) {
    return;
    const touchMoveX = e.touches[0].clientX;
    const {
      state: { targetPosition },
      quickState: { touchStartX, maxSwipe },
    } = this;

    const deltaX = touchStartX - touchMoveX;

    let currentSwipePosition = targetPosition + deltaX;
    currentSwipePosition = clamp(0, currentSwipePosition, maxSwipe);

    this.setQuickState({ touchMoveX, currentSwipePosition });
    this.updateSliderPosition(currentSwipePosition);
  }

  touchEnd() {
    return;
    const {
      props: { onSlideChange, children },
      state: { targetIndex, targetPosition },
      quickState: { currentSwipePosition },
    } = this;
    // compute new slide index
    // init search and result
    let minDist = Number.MAX_SAFE_INTEGER;
    let newTargetIndex = 0;
    let nextPos = 0;
    // search forward or backward from current target
    const shouldIncrement = targetPosition < currentSwipePosition;

    let idx = targetIndex;
    while (idx >= 0 && idx <= children.length - 1) {
      const elementPosition = this.getTargetPosition(idx);
      const dist = Math.abs(elementPosition - currentSwipePosition);
      if (minDist < dist) {
        // we are not improving anymore, break
        break;
      }
      minDist = dist;
      newTargetIndex = idx;
      nextPos = elementPosition;

      idx += shouldIncrement ? 1 : -1;
    }
    this.updateSliderPosition(nextPos);
    // reset
    this.setQuickState({ currentSwipePosition: null, touchStartX: null, touchMoveX: null });
    this.setState({ targetIndex: newTargetIndex, targetPosition: nextPos, touching: false }, () => {
      onSlideChange(newTargetIndex);
    });
  }

  async performSlide(slideDir) {
    const {
      state: { targetIndex, targetPosition: oldTargetPosition },
      props: { onSlideChange },
      context: { dir },
    } = this;

    const { scrollWidth, offsetWidth } = this.sliderEl;
    const maxTranslateX = scrollWidth - offsetWidth;

    const increment = (slideDir === FORWARD ? 1 : -1) * (dir === RTL ? -1 : 1);
    let newTargetIndex = targetIndex + increment;
    newTargetIndex = clamp(0, newTargetIndex, this.stepRefs.length - 1);

    const targetPosition = clamp(0, this.getTargetPosition(newTargetIndex), maxTranslateX);
    const isAtEnd = targetPosition >= maxTranslateX;
    const isAtBeginning = targetPosition === 0;

    if (oldTargetPosition === targetPosition) {
      return;
    }
    this.setState(
      {
        targetIndex: newTargetIndex,
        targetPosition,
        isAtBeginning,
        isAtEnd,
      },
      () => {
        onSlideChange(newTargetIndex);
      },
    );
  }

  render() {
    const {
      props: { children, t, className, nextClassName, prevClassName },
      state: { targetPosition, touching, mounted, isAtBeginning, isAtEnd, overflows },
      quickState: { currentSwipePosition },
      stepRefs,
    } = this;
    const sliderStyle = {};

    if (mounted && children.length > 0) {
      if (touching) {
        sliderStyle.transform = `translate(${-currentSwipePosition}px)`;
      } else {
        sliderStyle.transform = `translate(${-targetPosition}px)`;
      }
    }
    return (
      <div className={classNames(styles.container, className)}>
        <div className={styles.sliderOverflow}>
          <div
            ref={(ref) => {
              this.sliderEl = ref;
            }}
            onTouchStart={this.touchStart}
            onTouchMove={this.touchMove}
            onTouchEnd={this.touchEnd}
            style={sliderStyle}
            className={classNames(styles.slideContainer, !touching && styles.withTransitions)}
          >
            {React.Children.map(children, (child, index) =>
              React.cloneElement(child, { ref: (inst) => (stepRefs[index] = inst) }),
            )}
          </div>
        </div>
        {!isAtBeginning && overflows && (
          <button
            className={classNames('rtlTransform', prevClassName)}
            type="button"
            aria-label={t('previous')}
            onClick={() => this.performSlide(BACK)}
          >
            {getIcon({ type: PREVIOUS })}
          </button>
        )}
        {!isAtEnd && overflows && (
          <button
            className={classNames('rtlTransform', nextClassName)}
            type="button"
            aria-label={t('next')}
            onClick={() => this.performSlide(FORWARD)}
          >
            {getIcon({ type: NEXT })}
          </button>
        )}
      </div>
    );
  }
}

export default Translate(messages)(Slider);
