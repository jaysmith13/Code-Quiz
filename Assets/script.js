var score = 0;
var timeValue = 10;
var que_count = 0;
var que_numb = 1;
var userScore = 0;
var counter;
var counterLine;
var widthValue = 0;

// selectors
const start_btn = document.querySelector("#start_btn button");
const rules_box = document.querySelector("#Rules_box");
const exit_btn = document.querySelector(".buttons .quit");
const restart_btn = rules_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector("#quiz_box");
const score_box = document.querySelector("#score_box");
const options_list = document.querySelector("#options_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const resume_quiz = score_box.querySelector(".buttons .resume");
const discontinue_quiz = score_box.querySelector(".buttons .quit");
const next_btn = document.querySelector("footer .next_btn");
const bottom_question_counter = document.querySelector("footer .total_que");

// functions
function questionCounter (index){
    var totalQuestionCounTag = '<p>'+index +'</p> of <p>' + questions.length +'</p> Questions';
}
// if startQuiz button clicked
start_btn.onclick = ()=>{
    rules_box.classList.add("activeInfo"); //show rules box
}
// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    rules_box.classList.remove("activeInfo"); //hide rules box
}
// functions for resume button
resume_btn.onclick = ()=>{
    //hide rules box
    rules_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuestions(0); 
    questionCounter(1); 
    startTimer(10);
    startTimerLine(0);
}

//functions for restart button
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    //hide score box function 
    score_box.classList.remove("activeScore"); 
    timeValue = 10; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(question_count); 
    queCounter(question_numb); //
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Time Remaining"; 
    //hide the next button
    next_btn.classList.remove("show"); 
}
// function for exit button
exit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}



// function for next button
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++;
        que_numb++; 
        showQuestions(que_count); 
        queCounter(que_number); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Remaining"; 
        //hide the next button
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showScore();
    }
}
// getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    //creating a new span and div tag for question and option and passing the value using array index
    var que_tag = '<span>'+ questions[index].number + ". " + questions[index].question +'</span>';
    var options_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div id="options"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div id="options"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div id="options"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    options_list.innerHTML = options_tag; 
    
    const options = options_list.querySelectorAll(".options");
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        options[i].setAttribute("onclick", "optionSelected(this)");
    }
}
//if user clicked an option
function optionsSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    var userAnswers = answer.textContent; 
    var correcAnswer = questions[que_count].answer; 
    const allOptions = options_list.children.length; 
    
    if(userAnswers == correcAnswer){ 
        userScore += 1; 
        answer.classList.add("correct");  
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        
        console.log("Wrong Answer");
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAnswer){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}
function showScore(){
    rules_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    score_box.classList.add("activeResult"); //show result box
    const scoreText = score_box.querySelector(".score_text");
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        var scoreTag = '<span>Awesome job! <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        var scoreTag = '<span>Nice try! Click below to try again! <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        var scoreTag = '<span>Would you like to try again? <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        //if timer is less than five
        if(time < 5){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        //if timer is less than 0
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Out of time!"; 
            const allOptions = options_list.children.length; 
            var correcAnswer = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAnswer){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    console.log("Out of time, here's the correct answer");
                }
            }
            for(i=0; i < allOptions; i++){
                // Every answer is final
                option_list.children[i].classList.add("Every answer is final"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 20);
    function timer(){
        time += 1; 
        time_line.style.width = time + "px"; 
        if(time > 200){ 
            clearInterval(counterLine); 
        }
    }
}