#!/usr/bin/env node
import inquirer from 'inquirer' 
console.log("Welcome to Countdown APP")
interface CountdownOptions {
  duration: number; // Duration in seconds
  interval: number; // Update interval in milliseconds
}

class CountdownTimer {
  private startTime: number;
  private duration: number;
  private interval: number;
  private isRunning: boolean;

  constructor(options: CountdownOptions) {
    this.startTime = Date.now();
    this.duration = options.duration;
    this.interval = options.interval;
    this.isRunning = false;
  }

  start(): void {
    if (this.isRunning) {
      return;
    }

    this.startTime = Date.now();
    this.isRunning = true;

    this.runTimer();
  }

  private runTimer(): void {
    const remainingTime = this.duration - (Date.now() - this.startTime) / 1000;

    if (remainingTime <= 0) {
      this.stop();
      console.log('Countdown finished!');
      return;
    }

    console.clear();
    console.log(`Time remaining: ${formatTime(remainingTime)}`);

    setTimeout(() => this.runTimer(), this.interval);
  }

  stop(): void {
    this.isRunning = false;
  }
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${padZero(remainingSeconds)}`;
}

function padZero(number: number): string {
  return number < 10 ? `0${number}` : `${number}`;
}
let duration_input=await inquirer.prompt([{
message:" Please Enter duration",
type:"input",
name:"IdurationRequired"

}]) // 1 minute countdown
console.log(duration_input.IdurationRequired)
const options: CountdownOptions = {
  duration:duration_input.IdurationRequired*60, // 1 minute countdown
  interval: 1000, // Update every second
};

const countdownTimer = new CountdownTimer(options);
countdownTimer.start();
