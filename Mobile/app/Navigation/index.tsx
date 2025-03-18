import { styles, Dashboard } from "@/Components/Styles";
import { SafeAreaView, View, Text } from "react-native";

const Index = (): React.ReactNode => {
  return (
    <SafeAreaView style={styles.View}>
      <View style={Dashboard.IntroView}>
        <Text style={Dashboard.IntroHeader}>Welcome back</Text>
        <Text>View your performance on this page</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
