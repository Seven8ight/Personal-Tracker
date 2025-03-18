import { styles, Dashboard } from "@/Components/Styles";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Button,
  Pressable,
  Alert,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { createClient } from "pexels";
import { useEffect, useState } from "react";

const client = createClient(
    "0tOAdsHjY29NMWloE9V2YQdbg017o4n2Fm7wHcw0hQ3R8hws2OeqL1lk"
  ),
  query: string[] = [
    "retro",
    "lofi",
    "nature",
    "calligraphy",
    "setup",
    "scenery",
    "beach",
    "study",
    "motivation",
    "Artisanal",
    "Baking",
    "Architectural Detail",
    "Cityscape",
    "Abstract Art",
    "Artistic Coffee",
  ];

const Index = (): React.ReactNode => {
  const [photos, setPhotos] = useState<photos>(),
    randomPhotoIndex = Math.floor(Math.random() * 10);

  useEffect(() => {
    const photoFetcher = async (): Promise<Error | any> => {
      try {
        let gallery: photos | any = await client.photos.search({
          query: query.at(Math.round(Math.random() * 14)) as string,
          per_page: 10,
        });

        return gallery;
      } catch (error) {
        console.log(error);
      }
    };

    (async () => {
      setPhotos(await photoFetcher());
    })();
  }, []);

  return (
    <SafeAreaView style={styles.View}>
      <StatusBar backgroundColor="black" />
      <ScrollView style={Dashboard.ScrollView}>
        <View style={Dashboard.IntroView}>
          <Text style={Dashboard.IntroHeader}>Welcome back</Text>
          <Text style={Dashboard.IntroText}>Ready to start the day</Text>
        </View>
        <View style={Dashboard.Divider} />
        <View id="Summary Tab" style={Dashboard.Summary}>
          <Text style={Dashboard.SectionHeader}>Summary</Text>
          <View id="details" style={Dashboard.Details}>
            <View id="tasks">
              <Text>Tasks so far</Text>
              <View style={Dashboard.Subsections}>
                <Icon name="tasks" size={20} />
                <Text>5</Text>
              </View>
            </View>
            <View id="timeTaken">
              <Text>Time</Text>
              <View style={Dashboard.Subsections}>
                <Icon name="clock-o" size={20} />
                <Text>10 hrs</Text>
              </View>
            </View>
          </View>
        </View>
        <View id="Audio Recordings Tab">
          <Text style={Dashboard.SectionHeader}>Audio Recordings</Text>
          <View style={Dashboard.Recordings} id="recordings">
            <View style={Dashboard.Recording} id="recording1">
              <Text>Recording 1</Text>
              <Pressable>
                <Icon style={{ alignSelf: "center" }} name="play" />
              </Pressable>
            </View>
          </View>
          <Button
            title="Record"
            onPress={() =>
              Alert.alert("Audio Recording", "It's supposed to record audio", [
                {
                  text: "Ok",
                  onPress: () => console.log("Pressed on", Platform.OS),
                },
              ])
            }
          />
        </View>
        <View id="Music">
          <View>
            <Image
              style={{
                width: "100%",
                height: 150,
                objectFit: "cover",
                borderRadius: 10,
              }}
              source={{ uri: photos?.photos[randomPhotoIndex].src.original }}
            />
            <Text style={{ textAlign: "center", marginVertical: 10 }}>
              {photos?.photos[randomPhotoIndex].photographer}
            </Text>
            <View id="controls" style={Dashboard.Controls}>
              <Pressable>
                <Icon name="backward" size={15} />
              </Pressable>
              <Pressable>
                <Icon name="play" size={15} />
              </Pressable>
              <Pressable>
                <Icon name="forward" size={15} />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
