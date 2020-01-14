import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
      justifyContent: "center"
    },
    header: {
        paddingTop: 15,
        textAlign: "center",
        justifyContent: "center",
        fontSize: 40,
        color: Colors.mainText
    }
  });

export default styles;