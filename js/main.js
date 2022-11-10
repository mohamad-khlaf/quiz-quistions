
let countSpan       = document.querySelector(".quiz-info .count span");

let bullets         = document.querySelector(".bullets");

let bulletsSpans    = document.querySelector(".bullets .spans");

let titleElement    = document.querySelector(".quiz-area");

let optionElement   = document.querySelectorAll("label");

let answersArea     = document.querySelector(".answers-area");

let submit          = document.querySelector(".submit");

let results         = document.querySelector(".results");

let currentIndex    = 0;
let rightAnswer     = 0;


function getQuestions() {

  let myRequest = new XMLHttpRequest();
  
  myRequest.onreadystatechange = function () {

    if (this.readyState === 4 && this.status === 200) {

        let questions = JSON.parse(this.responseText);
        let countQuestions = questions.length;
        createBullets(countQuestions);
        addData(questions[currentIndex], countQuestions);


        submit.onclick = () => {

            if (currentIndex < questions.length) {

                let rightAnswer = questions[currentIndex].right_answer;
            
                currentIndex++;

                chickAnswer(rightAnswer, countQuestions);

                titleElement.innerHTML = '';
                answersArea.innerHTML = '';

                addData(questions[currentIndex], countQuestions);

                // handle bullets classes;

                handleBullets();
                showResults(countQuestions);

            } else {
                console.log("fiald");
            }
        }
    }
}

  myRequest.open("GET", "../js/html_questions.json");

  myRequest.send();

}

 getQuestions();

function createBullets(num) {
    countSpan.innerHTML = num;
    for(let i = 0; i < num; i++) {
        let span = document.createElement("span");
        i === 0 ? span.classList.add("active"): false;
        bulletsSpans.appendChild(span);
    }
}

function addData(question, count) {
    console.log(count);
    console.log(currentIndex);
    if (currentIndex < count) {
        
        let h2              = document.createElement("h2");
        let questionTitle   = document.createTextNode(question['title']);

        h2.appendChild(questionTitle);
        titleElement.appendChild(h2);

        for (let i = 0; i < 4; i++) {

            let optionAnswer    = document.createTextNode(question[`answer_${i + 1}`]);
            let paragraph       = document.createElement("p");
            let mainDiv         = document.createElement("div");
            let label           = document.createElement("label");
            let input           = document.createElement("input");
            mainDiv.className   = "answer";

            if (i === 0) { input.checked = true; }
            input.dataset.answer= question[`answer_${i + 1}`];
            input.type          = 'radio';
            input.name          = 'question';
            input.id            = `answer_${i + 1}`;
            
            label.htmlFor       = `answer_${i + 1}`;

        

            // appending 
            paragraph.appendChild(optionAnswer);
            label.appendChild(paragraph);

            mainDiv.appendChild(input);
            mainDiv.appendChild(label);

            answersArea.appendChild(mainDiv);

            
        }

    }
}

function chickAnswer(rAnswer , countQ) {


    let answers = document.getElementsByName('question');

    let theChoosesAnswer ;

    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {

            theChoosesAnswer = answers[i].getAttribute('data-answer')
        } 
        
    }
    
    console.log(rAnswer);
    console.log(theChoosesAnswer);

    if (rAnswer === theChoosesAnswer) {
        rightAnswer++;
        console.log("good");
    }
}

function handleBullets() {


    let bulletsSpan = document.querySelectorAll(".bullets .spans span");
    bulletsSpan.forEach((span, index) => {
        if(currentIndex === index) {
            span.className = "active";
        }
    })

}
function showResults(qCount) {
    
    if (qCount == currentIndex) {
        
        let theResulte;
        titleElement.remove();
        answersArea.remove();
        bullets.remove();
        submit.remove();
        
        if (rightAnswer > qCount / 2 && rightAnswer < qCount) {
            theResulte = `<span class="good">your results is good ${rightAnswer} from ${qCount}</span>`;
        } else if(rightAnswer == qCount ) {
            
            theResulte = `<span class="perfect">your results perfect is ${rightAnswer} from ${qCount}</span>`;
        } else {
            
            theResulte = `<span class="bad">your results bad is ${rightAnswer} from ${qCount}</span>`;
        }
        results.innerHTML = theResulte;
        
    }
}