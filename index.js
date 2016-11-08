import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Alert,
  Modal
} from 'react-native';
const { width, height } = Dimensions.get('window');
var MapView = require('react-native-maps')

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var print = function(a,b,c,d,e,f){
   //console.log('====>',a,b,c,d,e,f)
}

class PolylineMap extends Component {

    constructor(props) {
    super(props);
    this.mapReference ={}
    this.newRegion ={}
    this.state =  {
         region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta:10,
          longitudeDelta: 10,
         },
         latitudeDelta: 0,
         longitudeDelta:0,
         polylines: [],
         editing: null,
         scrollEnabled:true,
         drawing: false,
         showData : false,
         drawLine : true
       }
  }

 _addPointToPolyline = (Cord) => {
   print('########### CLICK MADE ################');
   print(' at LONGITUDE: ',Cord.longitude, 'LATITUDE:', Cord.latitude)

   var updatedPolyline = [].concat(this.state.polylines,Cord)

   print('Polyline Updated With =====>',Cord);
   print('Updated Polyline =====>',updatedPolyline);

   this.setState({
      polylines:updatedPolyline
   },()=>{
      print('POLYLINE UPDATED SUCCESSFULLY');
         polylineData = this.state.polylines
      print('CURRENT POLYLINE DATA : ', polylineData);
   })

}

closePolyline(){
   if(this.state.polylines[0].latitude !=  this.state.polylines[this.state.polylines.length -1].latitude){
         var appendStartPointToEnd = this.state.polylines.concat(this.state.polylines[0])
            this.setState({
               polylines: appendStartPointToEnd
            })
            print('JOINING START AND END COORDINATES TO FORM LOOP');
   }
}
_animateToRegion = (zoomLevel) => {
   var LatRange = newRegion.latitudeDelta + zoomLevel
   var LatRange = newRegion.longitudeDelta + zoomLevel

   if(zoomLevel == 5) {
      if(LatRange >= 0 && LatRange < 160) {
         const region = {
           latitude: newRegion.latitude,
           longitude: newRegion.longitude,
           latitudeDelta:newRegion.latitudeDelta + zoomLevel ,
           longitudeDelta: newRegion.longitudeDelta + zoomLevel,
         }
         this.refs.Map.animateToRegion(region,100)
      }
   } else {
      if(LatRange >= 0 && LatRange < 160) {
         const region = {
           latitude: newRegion.latitude,
           longitude: newRegion.longitude,
           latitudeDelta:newRegion.latitudeDelta + zoomLevel ,
           longitudeDelta: newRegion.longitudeDelta + zoomLevel,
         }
         this.refs.Map.animateToRegion(region,100)
      }

   }
}

_drawLine(){
      return (
            <MapView.Polyline
            //key={polyline.id}
            coordinates={this.state.polylines}
            strokeColor="#1fca23"
            strokeWidth={2}
          />
      );
}

   reset = ()=>{
      this.setState({
         polylines:[]
      })
   }

   zoomIn = (delta)=> {
         var zoomLevel = delta/100.0000000001
         var Lat = this.newRegion.latitudeDelta-(this.newRegion.latitudeDelta * zoomLevel)
         var Lng = this.newRegion.longitudeDelta-(this.newRegion.longitudeDelta * zoomLevel)
         if(Lat  >= 0 &&  Lat <= 180) {
               this.mapReference.animateToRegion({
                latitude: this.newRegion.latitude,
                longitude: this.newRegion.longitude,
                latitudeDelta:Lat,
                longitudeDelta:Lng
             },500)
         } else {
            console.error('latitudeDelta Should be In tha range of 1 to 180 or longitudeDelta Should be In tha range of 1 to 360 ');
         }
   }

   zoomOut = (delta)=> {
         var zoomLevel = delta/100.0000000001
         var Lat = this.newRegion.latitudeDelta+(this.newRegion.latitudeDelta * zoomLevel)
         var Lng = this.newRegion.longitudeDelta+(this.newRegion.longitudeDelta * zoomLevel)
         if(Lat  >= 0 &&  Lat <= 180) {
               this.mapReference.animateToRegion({
                latitude: this.newRegion.latitude,
                longitude: this.newRegion.longitude,
                latitudeDelta:Lat,
                longitudeDelta:Lng
             },500)
         } else {
         console.error('latitudeDelta Should be In tha range of 1 to 180 or longitudeDelta Should be In tha range of 1 to 360 ');
         }
   }


  render() {
    return (
        <MapView
           loadingEnabled ={false}
           style={{flex:1}}
           //mapType = 'satellite'
           zoomEnabled  = {this.state.scrollEnabled}
           scrollEnabled ={this.state.scrollEnabled}
           initialRegion={this.state.region}
           ref = {(MapRef) => {if(MapRef != null){this.mapReference = MapRef}}}
           loadingEnabled ={true}
           onRegionChangeComplete = {(movedTo) => { this.newRegion = movedTo }}
           animateToRegion = {this._animateToRegion}
          onPress={(e)=>{this._addPointToPolyline(e.nativeEvent.coordinate)}}>
            {this._drawLine()}
            {this.state.polylines.map(polyline => (
                <MapView.Marker
                  key = {polyline.latitude + polyline.longitude + Math.random()}
                  coordinate={polyline}
                  //image = {require('./images/pointer.png')}
                />
           ))}
        </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
}
});

module.exports = PolylineMap
