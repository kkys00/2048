const table = document.getElementById('table');
let data = [];
const score = document.getElementById('score');

function init(){
    const fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(function(){
        let colData = [];
        data.push(colData);
        const tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(function(){
            colData.push(0);
            const td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}

function randomCreate(){//빈칸 좌표를 찾아서 2를 넣음
    let blankArray = [];
    data.forEach(function(colData, i){
        colData.forEach(function(rowData, j){
            if(!rowData){
                blankArray.push([i, j]);
            }
        });
    });
    if(blankArray.length === 0){
        alert('game over   ' + score.textContent);
        table.innerHTML = '';
        init();
    }
    else{
        var randomBlock = blankArray[Math.floor(Math.random() * blankArray.length)];
        data[randomBlock[0]][randomBlock[1]] = 2;
        draw();
    }
    
}

function draw(){
    data.forEach(function(colData, i){
        colData.forEach(function(rowData, j){
            if(rowData > 0){
                table.children[i].children[j].textContent = rowData;
            } else{
                table.children[i].children[j].textContent = '';
            }
        });
    });
}

//마우스를 움직여서 방향을 확인해야 함
/*
screenX: 모니터 기준 좌표
pageX: 페이지(스크롤 포함)
clientX: 브라우저 화면 기준
offsetX: 이벤트 타겟 기준
*/
let dragStart = false; //드래그를 하고 있는지 확인하는 flag 변수
let draging = false;
let startCo;
let endCo;
function mouseDownHandler(event){
    dragStart = true;
    startCo = [event.clientX, event.clientY];
    console.log('dragstart', startCo[0], startCo[1]);
}

function mouseMoveHandler(event){
    if(dragStart){
        console.log('drag');
        draging = true;
    }
}

function mouseUpHandler(event){
    endCo = [event.clientX, event.clientY];
    let direction;
    let dx = endCo[0] - startCo[0];
    let dy = endCo[1] - startCo[1];
    if(draging){
        dragStart = false;
        let temp = Math.abs(dx) / Math.abs(dy);
        if(dx < 0 && temp > 1){
            direction = 'l';
        } else if(dx > 0 && temp > 1){
            direction = 'r';
        } else if(dy > 0 && temp < 1){
            direction = 'd';
        } else if(dy < 0 && temp < 1){
            direction = 'u';
        }
    }
    console.log(dx, dy, direction);
    draging = false;

    let newData;

    switch(direction){
        case 'l':
            newData = [[],[],[],[]];
            data.forEach(function(colData, i){
                colData.forEach(function(rowData, j){
                    if(rowData){
                        if(newData[i][newData[i].length-1] && newData[i][newData[i].length-1] === rowData){
                            //값이 합쳐져야 되는 경우
                            newData[i][newData[i].length -1] *= 2;
                            let curScore = parseInt(score.textContent, 10);
                            score.textContent = curScore + newData[i][newData[i].length-1];
                        } else{
                            newData[i].push(rowData);
                        }
                    }
                });
            });
            [1,2,3,4].forEach(function(colData, i){
                [1,2,3,4].forEach(function(rowData, j){
                    data[i][j] = newData[i][j] || 0;
                });
            });
            break;
        case 'r':
            newData = [[],[],[],[]];
            data.forEach(function(colData, i){
                colData.forEach(function(rowData, j){
                    if(rowData){
                        if(newData[i][0] && newData[i][0] === rowData){
                            //값이 합쳐져야 되는 경우
                            newData[i][0] *= 2;
                            let curScore = parseInt(score.textContent, 10);
                            score.textContent = curScore + newData[i][0];
                        } else{
                            newData[i].unshift(rowData);
                        }
                        
                    }
                });
            });
            [1,2,3,4].forEach(function(colData, i){
                [1,2,3,4].forEach(function(rowData, j){
                    data[i][3-j] = newData[i][j] || 0;
                });
            });
            break;
        case 'u':
            newData = [[],[],[],[]];
            data.forEach(function(colData, i){
                colData.forEach(function(rowData, j){
                    if(rowData){
                        const myData = newData[j][newData[j].length-1];
                        if(myData && myData === rowData){
                            //값이 합쳐져야 되는 경우
                            newData[j][newData[j].length-1] *= 2;
                            let curScore = parseInt(score.textContent, 10);
                            score.textContent = curScore + newData[j][newData[j].length-1];
                        } else{
                            newData[j].push(rowData);
                        }
                        
                    }
                });
            });
            [1,2,3,4].forEach(function(rowData, i){
                [1,2,3,4].forEach(function(colData, j){
                    data[j][i] = newData[i][j] || 0;
                });
            });
            break;
        case 'd':
            newData = [[],[],[],[]];
            data.forEach(function(colData, i){
                colData.forEach(function(rowData, j){
                    if(rowData){
                        const myData = newData[j][0];
                        if(myData && myData === rowData){
                            //값이 합쳐져야 되는 경우
                            newData[j][0] *= 2;
                            let curScore = parseInt(score.textContent, 10);
                            score.textContent = curScore + newData[j][0];
                        } else{
                            newData[j].unshift(rowData);
                        }
                    }
                });
            });
            [1,2,3,4].forEach(function(rowData, i){
                [1,2,3,4].forEach(function(colData, j){
                    data[3-j][i] = newData[i][j] || 0;
                });
            });
            break;
    }
    draw();
    randomCreate();
}

init();
randomCreate();
draw();

window.addEventListener('mousedown', mouseDownHandler);
window.addEventListener('mousemove', mouseMoveHandler);
window.addEventListener('mouseup', mouseUpHandler);
