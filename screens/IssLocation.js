import React, { Component } from 'react';
import { Text, View ,SafeAreaView,ImageBackground,StyleSheet,StatusBar,Alert,Image,Platform} from 'react-native';
import MapView,{Marker} from 'react-native-maps'
import axios from 'axios'
export default class IssLocationScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            location:{}
        }
    }
    ComponentDidMount(){
        this.getIsslocation()
    }

    getIsslocation =()=>{
        axios 
        .get("https://api.wheretheiss.at/v1/satellites/25544")
        .then(response=>{this.setState({location:response.data})})
        .catch(error=>{Alert.alert(error.message)})
    }
    render() {
        if(Object.keys(this.state.location).lenght===0){
            return(<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>LOADING...</Text>
            </View>)
        }else{
        return (
            <View style={styles.container}>
            <SafeAreaView style={styles.droidSafeArea} />
            <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
                <View style={styles.titleBar}>
                    <Text style={styles.titleText}>ISS Location</Text>
                </View>
                <View style={styles.mapcontainer}>
                <MapView
                style={styles.map}
                region={{
                    latitude:this.state.location.latitude,
                    longitude:this.state.location.longitude,
                    latitudeDelta:100,
                    longitudeDelta:100
                }}>
                <Marker
                coordinate={{
                     latitude:this.state.location.latitude,
                    longitude:this.state.location.longitude
                }}>
                <Image source={require("../assets/iss_icon.png")} style={{height:50,width:50}}/>
                </Marker>
                </MapView>
                </View>
                <View style={styles.infocontainer}>
                <Text style={styles.infotext}>Latitude:{this.state.location.latitude}</Text>
                <Text style={styles.infotext}>Longitude:{this.state.location.longitude}</Text>
                <Text style={styles.infotext}>Altitude:{this.state.location.altitude}</Text>
                <Text style={styles.infotext}>Velocity:{this.state.location.velocity}</Text>
                </View>
                </ImageBackground>
            </View>
        )
    }
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white"
    },
    mapcontainer:{
        flex:0.6
    },
    map:{
        width:'100%',
        height:'100%'
    },
    infocontainer:{
        flex:0.2,
        backgroundColor:"white",
        marginTop:-10,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:30
    },
    infotext:{
        fontSize:15,
        fontWeight:"bold",
        color:"black"
    }
});
