import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput } from 'react-native-paper';

const Home = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const handleSearch = (text) => {
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource and update FilteredDataSource
          const newData = data.filter(function (item) {
            // Applying filter for the inserted text in search bar
            const itemData = item.brand
              ? item.brand.toUpperCase()
              : "".toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredProducts(newData);
          setSearch(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredProducts(data);
          setSearch(text);
        }
      };

    const getproductlisting = async () => {
        console.log('product listing');
        try {
            const response = await fetch('https://dummyjson.com/products',
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
            const json = await response.json();
            setData(json.products)
            console.log('product details', json.products[0]);
        } catch (error) {
            console.log('divesh', error)
        }
    }

    useEffect( () => {
         getproductlisting();
    
    }, []);

    const renderItem = ({ item }) => (
        <View style={{ margin: '2%' }}>
            <Image
                source={{ uri: item.thumbnail }}
                style={styles.imageui}
            />
            <View style={{marginLeft:wp(4)}}>
                <Text style={styles.brandname}>{item.brand}</Text>
                <View style={styles.flexD}>
                    <Text style={styles.rating}>Rating {item.rating}</Text>
                    <Icon name='star' size={17} color='green' />
                </View>
                <Text style={styles.rating}>InStock({item.stock})</Text>
                <Text style={styles.rating}>₹{item.price}</Text>
                <Text style={styles.rating}>{item.discountPercentage}% Off</Text>
            </View>
            <View style={styles.buynow}>
                <TouchableOpacity onPress={() => navigation.navigate('Productdetails', { id: item.id })}>
                    <Text style={styles.buynowtext}>Buy Now</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput label="Search Product" outlineColor='black' onChangeText={(text) => handleSearch(text)} value={search} style={styles.textinputs} color='black' activeOutlineColor='black' mode="outlined" />
            <ScrollView>
                <FlatList
                    data={search?filteredProducts: data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
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
    line: {
        height: 2,
        backgroundColor: 'grey',
        marginVertical: 10,
      },
    flexD: {
        flexDirection: 'row',
    },
    rating: {
        color: 'black',
        fontSize: 18,
        marginBottom:'2%'
    },
    brandname: {
        color: 'black',
        fontSize: 25,
        marginBottom:'3%'
    },
    imageui: {
        width: wp(70),
        height: hp(20),
        alignSelf: 'center',
        borderRadius: 20,
        resizeMode: 'stretch',
    },
    buynow: {
        width: wp(70),
        height: hp(6),
        backgroundColor: 'orange',
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom:'3%'
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

export default Home;