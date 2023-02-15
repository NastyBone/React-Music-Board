
class DrumMachine extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     playingNow: "none",
     keyRightNow: ""
   }
}
  

  
  callMeMaybe(pad){console.log(pad);
  this.setState({playingNow: pad.name})

                  }
  keyPlay(e) {
  this.setState({
  keyRightNow: e.which})
              ;}
  componentWillMount(){
  document.addEventListener("keydown",this.keyPlay.bind(this))
  }
  
  componentWillUnmount(){
  document.removeEventListener("keydown",this.keyPlay.bind(this))
  }

 
 render(){

   return(
     <body>
    <div id= "display">
       <div id ="container">
   {drumPads.map( (pad,idx) => {
 
          return(  
      <DrumPad id = {pad.id} now={this.state.keyRightNow} onClick = {this.callMeMaybe.bind(this,pad)} value = {pad.value} src={pad.src} name={pad.name} />
           )
}
                )}
         
      </div>
     
   
     <ControlPanel play= {this.state.playingNow} />
       </div>
   
          </body>)
          }}

//_________________________________________
class DrumPad extends React.Component {
 constructor(props) {
   super(props);
  
 }
  componentWillMount(){
  document.addEventListener("keydown",this.isPlaying.bind(this))
  }
  componentWillUnmount(){
  document.removeEventListener("keydown",this.isPlaying.bind(this))
  }
  play(str){
       var audio = document.getElementById(str);
       audio.play();
                 }
  handleClick(e){
    if(e.which){
      this.play(translator(e.which));
    } else {this.play(e.target.name)}
  this.props.onClick();
 }
  isPlaying(e){
 if(this.props.now == this.props.value){
  this.handleClick(e);
}
};

render(){
  return(
  <button  id = {this.props.name} className= "drum-pad btn btn-primary"  onClick={this.handleClick.bind(this)} name = {this.props.id}>
      <audio src={this.props.src} id = {this.props.id}
        type ="audio/mp3" className="clip">
      </audio><span>
      {this.props.id} </span>
    </button>
        )
        }
  
}

//_________________________________________
class ControlPanel extends React.Component {
 constructor(props){
   super(props);
 }
  
  render() {
    return (
      <div id = "control-panel">
        <h4>Now Playing:</h4>
        <h5>{this.props.play}</h5>
      </div>
    )
  }
}
//_________________________________________

const drumPads = [
  {"id": "Q", "src": "https://sampleswap.org/samples-ghost/INSTRUMENTS%20(SINGLE%20SAMPLES)/Guitars/92[kb]bendynote.aif.mp3", "value": 81, "name": "Bendy Note"},
  {"id": "W", "src": "https://sampleswap.org/samples-ghost/INSTRUMENTS%20(SINGLE%20SAMPLES)/Guitars/16[kb]countrychord.aif.mp3", "value": 87, "name": "Country Chord"},
  {"id": "E", "src": "https://sampleswap.org/samples-ghost/INSTRUMENTS%20(SINGLE%20SAMPLES)/Guitars/20[kb]gtrchord.aif.mp3", "value": 69, "name": "GTR Chord"},
  {"id": "A", "src": "https://sampleswap.org/samples-ghost/INSTRUMENTS%20(SINGLE%20SAMPLES)/Guitars/41[kb]mellow-guitar-chord-1.wav.mp3", "value": 65, "name": "Mellow Guitar 1"},
  {"id": "S", "src": "https://sampleswap.org/samples-ghost/INSTRUMENTS%20(SINGLE%20SAMPLES)/Guitars/23[kb]mellow-guitar-chord-3.wav.mp3", "value": 83, "name": "Mellow Guitar 3"},
  {"id": "D", "src": "https://sampleswap.org/samples-ghost/INSTRUMENTS%20(SINGLE%20SAMPLES)/Guitars/37[kb]wah-flange.aif.mp3", "value": 68, "name": "Wah Flange"},
  {"id": "Z", "src": "https://sampleswap.org/samples-ghost/INSTRUMENTS%20(SINGLE%20SAMPLES)/Guitars/17[kb]wah-hit.aif.mp3", "value": 90, "name": "Wah Hit"},
  {"id": "X", "src": "https://sampleswap.org/samples-ghost/INSTRUMENTS%20(SINGLE%20SAMPLES)/Guitars/54[kb]bellguitar1.aif.mp3", "value": 88, "name": "Bell Guitar 1"},
  {"id": "C", "src": "https://sampleswap.org/samples-ghost/INSTRUMENTS%20(SINGLE%20SAMPLES)/Guitars/49[kb]bellguitar2.aif.mp3", "value": 67, "name": "Bell Guitar 2"}
                ];
const translator = (int) =>{
  for( let i=0; i<=drumPads.length; i++){
    if(int == drumPads[i].value){
      return drumPads[i].id
    }}}


ReactDOM.render(<DrumMachine id="drum-machine"/>,document.getElementById("drum-machine"))

/*
User Story #1: I should be able to see an outer container with a corresponding id="drum-machine" that contains all other elements.

User Story #2: Within #drum-machine I can see an element with a corresponding id="display".

User Story #3: Within #drum-machine I can see 9 clickable drum pad elements, each with a class name of drum-pad, a unique id that describes the audio clip the drum pad will be set up to trigger, and an inner text that corresponds to one of the following keys on the keyboard: Q, W, E, A, S, D, Z, X, C. The drum pads MUST be in this order.

User Story #4: Within each .drum-pad, there should be an HTML5 audio element which has a src attribute pointing to an audio clip, a class name of clip, and an id corresponding to the inner text of its parent .drum-pad (e.g. id="Q", id="W", id="E" etc.).

User Story #5: When I click on a .drum-pad element, the audio clip contained in its child audio element should be triggered.

User Story #6: When I press the trigger key associated with each .drum-pad, the audio clip contained in its child audio element should be triggered (e.g. pressing the Q key should trigger the drum pad which contains the string "Q", pressing the W key should trigger the drum pad which contains the string "W", etc.).

User Story #7: When a .drum-pad is triggered, a string describing the associated audio clip is displayed as the inner text of the #display element (each string must be unique).*/