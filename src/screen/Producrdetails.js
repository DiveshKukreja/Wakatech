import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Productdetails = ({ route, navigation }) => {

    const [data, setData] = useState([]);
    const { id } = route.params;
    console.log('divesh kukreja', route.params)

    const getproductlisting = async () => {
        console.log('product listing');
        try {
            const response = await fetch('https://dummyjson.com/products/' + id,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
            const json = await response.json();
            setData(json)
            // console.log('product', img)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getproductlisting();
    }, []);
   

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ margin: '3%' }}>
                    <Image
                        source={{ uri: data.thumbnail }}
                        style={styles.imageui}
                    />
                    <View style={{ marginLeft: wp(4), marginTop: '5%' }}>
                        <Text style={styles.brandname}>{data.brand}</Text>
                        <Text style={styles.rating}>{data.description}</Text>
                        <View style={styles.flexD}>
                            <Text style={[styles.rating, { fontSize: 30, fontWeight: 'bold' }]}>₹{data.price}</Text>
                            <Text style={[styles.rating, { marginTop: '3%' }]}>({data.discountPercentage}% off)</Text>
                        </View>
                        <View style={styles.flexD}>
                            <Text style={styles.rating}>{data.rating}</Text>
                            <Icon name='star' size={20} color='green' />
                        </View>
                        <Text style={styles.rating}>InStock({data.stock})</Text>
                    </View>
                    <View style={styles.buynow}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.buynowtext}>Back</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: '#F8F6F0'
    },
    flexD: {
        flexDirection: 'row',
    },
    rating: {
        color: 'black',
        fontSize: 18,
        marginBottom: '2%'
    },
    brandname: {
        color: 'black',
        fontSize: 25,
        marginBottom: '3%'
    },
    imageui: {
        width: wp(80),
        height: hp(35),
        alignSelf: 'center',
        borderRadius: 20,
        resizeMode: 'stretch',
    },
    imageuides: {
        width: 100,
        height: 100,
        // alignSelf: 'center',
        borderRadius: 20,
        resizeMode: 'stretch',
    },
    buynow: {
        width: wp(70),
        height: hp(6),
        backgroundColor: 'orange',
        borderRadius: 20,
        alignSelf: 'center'
    },
    buynowtext: {
        alignSelf: 'center',
        fontSize: 25,
        padding: 3,
        color: 'white'
    },
    textinputs: {
        marginTop: '3%',
        backgroundColor: 'white',
        width: wp(90),
        alignSelf: 'center',
        marginBottom: '3%'
    },
})

export default Productdetails;