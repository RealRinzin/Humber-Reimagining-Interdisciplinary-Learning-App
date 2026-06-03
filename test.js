const video_setting = {
    video: true,
    code: true,
    rambling: true,
    quiz: true,
    interactive: false
}

const user_content_setting =
{
    video: true,
    code: true,
    rambling: false,
    quiz: false,
    interactive: false
}

const user_video_setting =
{
    video: true,
    code: false,
    rambling: false,
    quiz: true,
    interactive: false
}

const getTrueKeys = (obj) =>
    Object.keys(obj).filter(key => obj[key] === true);

getTrueKeys(video_setting);        // ["video", "quiz"]
getTrueKeys(user_content_setting); // ["code", "interactive"]
getTrueKeys(user_video_setting); 
