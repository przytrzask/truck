input.onGesture(Gesture.TiltLeft, function () {
    basic.showIcon(IconNames.Chessboard)
})
input.onGesture(Gesture.TiltRight, function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
input.onButtonPressed(Button.A, function () {
    music.play(music.tonePlayable(147, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
})
input.onButtonPressed(Button.B, function () {
    if (wlaczony) {
        SuperBit.MotorRun(SuperBit.enMotors.M1, 0)
        wlaczony = 0
    } else {
        SuperBit.MotorRun(SuperBit.enMotors.M1, 255)
        wlaczony = 1
    }
})
input.onGesture(Gesture.ThreeG, function () {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
})
input.onGesture(Gesture.Shake, function () {
    music.play(music.tonePlayable(247, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
})
let gaz = 0
let wlaczony = 0
let x = 0
radio.setGroup(1)
wlaczony = 0
const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const range = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    a: number
) => lerp(x2, y2, invlerp(x1, y1, a));
basic.forever(function () {
    gaz = pins.analogReadPin(AnalogPin.P2)
    // if (silnik) {
    // SuperBit.MotorRun(SuperBit.enMotors.M2, 255)
    // } else {
    // SuperBit.MotorRun(SuperBit.enMotors.M2, 0)
    // }
    // 0 to 1023
    x = pins.analogReadPin(AnalogPin.P1)
    const xAxis = range(0, 1023, 70, 200, x)
SuperBit.Servo(SuperBit.enServo.S2, xAxis)
    radio.sendValue("skręt", xAxis)
    if (gaz > 4) {
        SuperBit.MotorRun(SuperBit.enMotors.M1, 0)
        radio.sendValue("gaz", 0)
    } else {
        SuperBit.MotorRun(SuperBit.enMotors.M1, -255)
        radio.sendValue("gaz", -255)
    }
})
basic.forever(function () {
	
})
