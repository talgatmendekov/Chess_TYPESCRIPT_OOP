import React, { FC, useEffect, useRef, useState } from "react";
import { Colors } from "../models/figures/Colors";
import { Player } from "../models/figures/Player";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

export const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);

  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callBack =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callBack, 1000);
  };
  const decrementBlackTimer = () => {
    setBlackTime((prev) => prev - 1);
  };
  const decrementWhiteTimer = () => {
    setWhiteTime((prev) => prev - 1);
  };

  const handlerRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  };
  return (
    <div>
      <div>
        <button onClick={handlerRestart}>Restart game</button>
      </div>
      <h2>Black - {blackTime}</h2>
      <h2>White - {whiteTime}</h2>
    </div>
  );
};
