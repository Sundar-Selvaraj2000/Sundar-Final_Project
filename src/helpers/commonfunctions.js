

export const getTimeDiffFromGivenDate = (givenTime)=>{
    if(givenTime){
        let currentTime = new Date().getTime();
        let timeDiff = currentTime - givenTime;
        let diffInMin = (timeDiff/1000)/60;
        return Math.ceil(diffInMin)
    }
    return 0;
}
    