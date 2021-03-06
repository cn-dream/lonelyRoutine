/**
 * Pause  component
 * A pause toast
 * 
 * Date 2017/2/8
 * Author Jason
 */
import React from 'react';
import './Pause.scss';
import * as MiniGame from '../../miniGame';
import * as gv from '../../common/global.js';
const CANVAS_WIDTH=gv.canvas.width;
const CANVAS_HEIGHT=gv.canvas.height;
console.log(CANVAS_WIDTH,CANVAS_HEIGHT);
//only div
const s={
    toast:'pauseToast',
    toastOrigin:'toast',
    pause:'pause',
    pauseButton:'pauseButton'
}
let pauseToast={
    padding:'5px 40px 20px 40px',
    marginLeft :'25%',
    marginTop:'15%',
    color:'blue',
    display:'none'
}
let stylePause={
    borderLeft:'10px solid white',
    borderRight:'10px solid white',
    display:'inline',
    position:'absolute',
    left:'6%',
    top:'12%',
    width:'auto',
    height:'auto',
    color:'transparent',
    cursor:'pointer',
    zIndex:'1000'
}

class Pause extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:'',
            display:'none'
        };
        this.handleClick=this.handleClick.bind(this);
       
    }

    componentWillMount(){

    }

    componentDidMount(){
        //window.onblur=MiniGame.windowOnBlur(this);
        //window.onfocus=MiniGame.windowOnFocus(this);
        console.log('work');
        //document.addEventListener('blur', ()=>{MiniGame.windowOnBlur(this)} );
        window.onblur=()=>{
            //console.log(this);  if you don't use arrow function ,then this -> window
            //now this -> Pause object -- a React Component
            MiniGame.windowOnBlur(this);
        }
        window.onfocus=()=>{
            MiniGame.windowOnFocus(this);
        }
    }

    handleClick(){
        MiniGame.pauseToastClickHandler(this);
    }



    render(){
        pauseToast.display=this.state.display;
        return(
            <div>
                <div className={s.toast+' '+s.toastOrigin} 
                        onClick={this.handleClick}
                        style={pauseToast}>
                    <p className={s.pause}>{this.props.pause.info}</p>
                    <p>{this.props.pause.start}</p>
                </div>
                <span style={stylePause} 
                            onClick={this.handleClick}>|</span>
            </div>
        );
    }
}

export default Pause;