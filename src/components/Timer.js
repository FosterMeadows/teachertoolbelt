// src/components/Timer.js
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import './Timer.css';
import { gsap } from 'gsap';

const Timer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    Countdown.init(totalSeconds, setTotalSeconds);
  }, [totalSeconds]);

  const handleDecreaseTime = () => {
    setTotalSeconds(prev => Math.max(prev - 60, 0));
  };

  const handleIncreaseTime = () => {
    setTotalSeconds(prev => prev + 60);
  };

  const handleDoubleClick = () => {
    const input = prompt("Enter the number of minutes:");
    if (input !== null) {
      const minutes = parseInt(input, 10);
      if (!isNaN(minutes)) {
        setTotalSeconds(minutes * 60);
      }
    }
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      Countdown.start();
    } else {
      Countdown.pause();
    }
  };

  return (
    <div className="wrap">
      
      <div className="countdown-container">
        <div className="countdown" onDoubleClick={handleDoubleClick}>
          <div className="bloc-time min" data-init-value="0">
            <span className="count-title">Minutes</span>
            <div className="figure min min-1">
              <span className="top">0</span>
              <span className="top-back"><span>0</span></span>
              <span className="bottom">0</span>
              <span className="bottom-back"><span>0</span></span>
            </div>
            <div className="figure min min-2">
              <span className="top">0</span>
              <span className="top-back"><span>0</span></span>
              <span className="bottom">0</span>
              <span className="bottom-back"><span>0</span></span>
            </div>
          </div>
          <div className="bloc-time sec" data-init-value="0">
            <span className="count-title">Seconds</span>
            <div className="figure sec sec-1">
              <span className="top">0</span>
              <span className="top-back"><span>0</span></span>
              <span className="bottom">0</span>
              <span className="bottom-back"><span>0</span></span>
            </div>
            <div className="figure sec sec-2">
              <span className="top">0</span>
              <span className="top-back"><span>0</span></span>
              <span className="bottom">0</span>
              <span className="bottom-back"><span>0</span></span>
            </div>
          </div>
        </div>
      </div>
      <div className="control-container">
        <Button className="time-adjust-button" onClick={handleDecreaseTime}>-</Button>
        <Button className="play-pause-button" onClick={handlePlayPause}>
          {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
        </Button>
        <Button className="time-adjust-button" onClick={handleIncreaseTime}>+</Button>
      </div>
    </div>
  );
};

const Countdown = {
  $el: null,
  countdown_interval: null,
  total_seconds: 0,
  setTotalSeconds: null,

  init: function (totalSeconds, setTotalSeconds) {
    this.$el = document.querySelector('.countdown');
    this.setTotalSeconds = setTotalSeconds;

    this.$ = {
      minutes: this.$el.querySelectorAll('.bloc-time.min .figure'),
      seconds: this.$el.querySelectorAll('.bloc-time.sec .figure')
    };

    this.values = {
      minutes: Math.floor(totalSeconds / 60),
      seconds: totalSeconds % 60
    };

    this.total_seconds = totalSeconds;
    this.updateDOM();
  },

  start: function () {
    const that = this;
    const $min_1 = this.$.minutes[0];
    const $min_2 = this.$.minutes[1];
    const $sec_1 = this.$.seconds[0];
    const $sec_2 = this.$.seconds[1];

    if (this.countdown_interval) clearInterval(this.countdown_interval);

    this.countdown_interval = setInterval(function () {
      if (that.total_seconds > 0) {
        --that.values.seconds;
        if (that.values.minutes >= 0 && that.values.seconds < 0) {
          that.values.seconds = 59;
          --that.values.minutes;
        }

        that.checkHour(that.values.minutes, $min_1, $min_2);
        that.checkHour(that.values.seconds, $sec_1, $sec_2);
        --that.total_seconds;
        that.setTotalSeconds(that.total_seconds);
      } else {
        clearInterval(that.countdown_interval);
      }
    }, 1000);
  },

  pause: function () {
    clearInterval(this.countdown_interval);
  },

  updateDOM: function () {
    const $min_1 = this.$.minutes[0];
    const $min_2 = this.$.minutes[1];
    const $sec_1 = this.$.seconds[0];
    const $sec_2 = this.$.seconds[1];

    this.checkHour(this.values.minutes, $min_1, $min_2);
    this.checkHour(this.values.seconds, $sec_1, $sec_2);
  },

  animateFigure: function ($el, value) {
    const $top = $el.querySelector('.top');
    const $bottom = $el.querySelector('.bottom');
    const $back_top = $el.querySelector('.top-back');
    const $back_bottom = $el.querySelector('.bottom-back');

    $back_top.querySelector('span').innerHTML = value;
    $back_bottom.querySelector('span').innerHTML = value;

    gsap.to($top, {
      duration: 0.8,
      rotationX: '-180deg',
      transformPerspective: 300,
      ease: 'power1.out',
      borderRadius: '8px',  // Ensure border-radius is set
      onComplete: function () {
        $top.innerHTML = value;
        gsap.set($top, { rotationX: 0, borderRadius: '8px' });  // Ensure border-radius is set
      }
    });

    gsap.to($back_top, {
      duration: 0.8,
      rotationX: 0,
      transformPerspective: 300,
      ease: 'power1.out',
      clearProps: 'all',
      borderRadius: '8px'  // Ensure border-radius is set
    });

    gsap.to($bottom, {
      duration: 0.8,
      rotationX: '-180deg',
      transformPerspective: 300,
      ease: 'power1.out',
      borderRadius: '8px',  // Ensure border-radius is set
      onComplete: function () {
        $bottom.innerHTML = value;
        gsap.set($bottom, { rotationX: 0, borderRadius: '8px' });  // Ensure border-radius is set
      }
    });

    gsap.to($back_bottom, {
      duration: 0.8,
      rotationX: 0,
      transformPerspective: 300,
      ease: 'power1.out',
      clearProps: 'all',
      borderRadius: '8px'  // Ensure border-radius is set
    });
  },

  checkHour: function (value, $el_1, $el_2) {
    const val_1 = value.toString().charAt(0);
    const val_2 = value.toString().charAt(1);

    if (value >= 10) {
      if ($el_1.querySelector('.top').innerHTML !== val_1) this.animateFigure($el_1, val_1);
      if ($el_2.querySelector('.top').innerHTML !== val_2) this.animateFigure($el_2, val_2);
    } else {
      if ($el_1.querySelector('.top').innerHTML !== '0') this.animateFigure($el_1, 0);
      if ($el_2.querySelector('.top').innerHTML !== val_1) this.animateFigure($el_2, val_1);
    }
  }
};

export default Timer;
