import { Observable, timer } from 'rxjs';

import React from 'react';

const source = timer(500)
let [counter, bufer, timer500ms] = [0, 0, 0]
let startedSinglton = false

let observable = new Observable(function subscribe(subscriber) {
  const intervalId = setInterval(() => {
    if (bufer !== 0) { counter = bufer; bufer = 0 }
    counter = counter + 1

    let elem = document.getElementById("ccount")

    let min = Math.floor(counter / 60)
    let sec = Math.floor(counter) - (min * 60);
    elem.textContent = min + ":" + sec
    subscriber.next(counter)
  }, 1000)

  this.unsubscribe = () => {
    counter = 0
    clearInterval(intervalId)
    subscriber.complete()
  }
});

function start() {
  if (!startedSinglton) {
    startedSinglton = true
    observable.subscribe({
      next(x) { },
      complete() { console.log('done'); }
    })
  }
}

function stop() {
  startedSinglton = false
  observable.unsubscribe()
}

function wait() {
  timer500ms++
  if (timer500ms === 2) {
    console.log("wait");
    bufer = counter
    timer500ms = 0
    stop()
  }
  source.subscribe(() => { timer500ms = 0; return })
}



export default function App() {

  return (
    <div className="card" style={{ width: "18rem" }}>
      <h1 id="ccount" style={{ textAlign: "center" }}>0:0 <span className="badge bg-secondary" id="ccount"></span></h1>
      <div className="card-body">
        <button onClick={() => { start() }} className='btn btn-secondary'>start</button> {' '}
        <button onClick={() => { stop() }} className='btn btn-secondary'>stop</button>{' '}
        <button onClick={() => { stop(); start() }} className='btn btn-secondary'>reset</button>{' '}
        <button className='btn btn-secondary' onClick={() => { wait() }}>wait</button>{' '}
      </div>
    </div>
  );
}

