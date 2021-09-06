import React,{Component} from "react";
import { ReactDOM } from "react";
import MeetingModal from "./Modal";


class DragComponent extends Component {
    
    constructor(props){
        super(props)

        this.state ={
            
            dragabale:true,
            modalShow:false
        
    
             }
    }


  setElemRef = ref => {
    this.elemRef = ref;
  }
  
  initialiseDrag = event => {
    if(this.props.data.timeProps.selectedDay){
        
   
    const {target, clientY} = event;
    const { offsetTop } = target;
    const { top } = this.elemRef.getBoundingClientRect();
    this.dragStartTop = 10 - offsetTop;
    this.dragStartY = clientY;
    window.addEventListener('mousemove', this.startDragging, false);
    window.addEventListener('mouseup', this.stopDragging, false);
    }else{
        alert("please select the date")
    }
  
  }
  
  startDragging = ({ clientY }) => { 
      console.log(clientY)
    let newTop = this.dragStartTop + clientY - this.dragStartY;
    if (newTop < 0) newTop = 0;
    this.elemRef.style.transform = `translateY(${newTop}px)`;
    this.scrollIfElementBottom(newTop);
  }

  stopDragging = () => {
    window.removeEventListener('mousemove', this.startDragging, false);
    window.removeEventListener('mouseup', this.stopDragging, false);
    if(this.props.data.timeProps.selectedDay){
        this.setState({
            dragabale:false,
            modalShow:true
        })
        // console.log( ReactDOM.findDOMNode(this.props.id).parentNode.getAttribute("id"),"mmmmmmmmmmmmmm")
       
    }
    
  }  
  
  scrollIfElementBottom = newTop => {
    if (newTop > 30) {
    //   window.scroll({
    //     top: newTop,
    //     behavior: 'smooth'
    //   });    
    }
    if (newTop < 30) {
    //   window.scroll({
    //     top: 0,
    //     behavior: 'smooth'
    //   });      
    }
  };
   modeShowHandler = (mode,status) => {
    this.setState({
        modalShow:false,
    
    })
    if(status === "open"){
        this.setState({
            dragabale:false

        })
    }

   }
  render(){
    return (
      <div  className= {this.props.id === this.props.clickId ? "block":"hidden"} time={this.props.time}>
        <div className="drag-comp" onMouseDown={this.initialiseDrag} ref={this.setElemRef}>DragMe</div>
        <MeetingModal selectedTimeId={this.props.time} show={this.state.modalShow} modalHandler={this.modeShowHandler} dataProb={this.props.data.timeProps} />

      </div>
    )
  }
}

export default DragComponent;