import Carousel2 from './Carousel2'
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native';

export default function ProductPage() {
    return (
        <View style={styles.container}>
            <View style={styles.carousel}>
                <Carousel2 />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>View Similar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Try it on</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.BrandName}>Brand Name</Text>
            <Text style={styles.productName}>Product Name</Text>
            <View style={styles.ratingContainer}>
                {/* Insert your star rating component here */}
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>$99.99</Text>
                <Text style={styles.discountedPrice}>$79.99</Text>
            </View>
            <Text style={styles.description}>Product description goes here...</Text>
            {/* Add further description components */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button2}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 5,
    },
    carousel: {
        height: 270, // Adjust height as needed
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        //backgroundColor: '#007bff', // Example color
        padding: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'red',
        marginTop: -7
    },
    button2: {
        //backgroundColor: '#007bff', // Example color
        padding: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'red',
        marginStart: '70%',
        marginVertical: '48%'
        
    },
    buttonText: {
        color: 'darkblue',
        fontWeight: 'bold',
        fontSize: 13
    },
    BrandName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productName: {
        fontSize: 15,
        fontWeight: 'normal',
        marginBottom: -10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    price: {
        fontSize: 15,
    },
    discountedPrice: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        color: 'gray',
        marginRight: '60%',
        marginBottom: -5
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    // Add further styles for description components
});
