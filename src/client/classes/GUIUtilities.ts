export class GUIUtilities {

    static test(inst: Instance, params: number) {

    }

    static InitializeGuiWheel(obj: Frame, speed: number) {

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





// function InitializeGuiTimer(TimerObj: TextLabel, time: number) {
//     let EndTime = os.time() + time
//     // var t = Date.parse(endtime) - Date.parse(new Date());
//     var seconds = Math.floor((EndTime / 1000) % 60);
//     var minutes = Math.floor((EndTime / 1000 / 60) % 60);
//     var hours = Math.floor((EndTime / (1000 * 60 * 60)) % 24);
//     var days = Math.floor(EndTime / (1000 * 60 * 60 * 24));
//     return {
//       'total': EndTime,
//       'days': days,
//       'hours': hours,
//       'minutes': minutes,
//       'seconds': seconds
//     };
//   }
  
// function initializeClock(id, endtime) {
//     function updateClock() {
//         var t = InitializeGuiTimer(endtime);
        
//         TimerObj.
//         daysSpan.innerHTML = t.days;
//         hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
//         minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
//         secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        
//         if (t.total <= 0) {
//           clearInterval(timeinterval);
//         }
//     }
  
//     updateClock();
//     var timeinterval = setInterval(updateClock, 1000);
// }








// function InitializeGuiTimer(TimerObj: TextLabel, time: number) {

//     function getTimeRemaining(time: number) {
//         let EndTime = os.time() + time
//         var seconds = Math.floor((t / 1000) % 60);
//         var minutes = Math.floor((t / 1000 / 60) % 60);
//         var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
//         var days = Math.floor(t / (1000 * 60 * 60 * 24));
//         return {
//         'total': t,
//         'days': days,
//         'hours': hours,
//         'minutes': minutes,
//         'seconds': seconds
//         };
//     }
    
//     function initializeClock(clockObj, endtime) {
//         function updateClock() {
//             var t = getTimeRemaining(endtime);
        
//             TimerObj.Text = 
        
//             if(t.total <= 0) {
//                 clearInterval(timeinterval);
//             }
//         }
    
//         updateClock();
//         var timeinterval = setInterval(updateClock, 1000);
//     }

//     initializeClock(TimerObj, 1000000);
// }
