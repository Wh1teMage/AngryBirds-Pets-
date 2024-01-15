export class GUIUtilities {

    static InitializeGuiWheel(obj: Frame, speed: number) {
        while (true) {
            obj.Rotation += speed
            task.wait(1)
        }
    }

    static InitializeGuiTimer(TimerObj: TextLabel, time: number) {

        let EndTime = os.time() + time

        function getTimeRemaining(){
            let timeLeft = EndTime - os.time()
            // return days + " days " + hours + " hours " + minutes + " minutes";
            return [math.floor( timeLeft/(1000*60*60*24) ), math.floor( (timeLeft/(1000*60*60)) % 24 ), math.floor( (timeLeft/1000/60) % 60 ), math.floor( (timeLeft/1000) % 60 )]
        }

        let t = getTimeRemaining()

        for (let index = 0; index <= t[2]; index++) {
            TimerObj.Text = `days ${t[0]} hours ${t[1]} minutes ${t[2]}`
            task.wait(60)
        }

    }
}