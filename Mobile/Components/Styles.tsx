import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Platform.select({
      ios: 200,
      android: 10,
    }),
  },
  TabBar: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 80,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: 35,
  },
  TabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export const Dashboard = StyleSheet.create({
  ScrollView: {
    flex: 1,
  },
  IntroView: {
    width: Platform.select({
      ios: 350,
      android: 340,
    }),
    height: 120,
    borderRadius: 10,
    padding: 10,
  },
  IntroHeader: {
    fontSize: 40,
    marginVertical: 10,
    textDecorationLine: "underline",
    textDecorationColor: "black",
  },
  IntroText: {
    fontWeight: "light",
    fontStyle: "italic",
  },
  Divider: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
  },
  //Common styles for Dashboard sections
  SectionHeader: {
    fontSize: 25,
    textDecorationLine: "underline",
    marginVertical: 10,
  },
  //Summary Tab
  Summary: {
    flex: 1,
    width: "100%",
    height: 150,
    padding: 10,
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    borderRadius: 20,
  },

  Details: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: 13,
  },
  Subsections: {
    marginTop: 10,
    width: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  //Music
  Recordings: {
    flexDirection: "column",
    height: 100,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  Recording: {
    flexDirection: "row",
    width: "80%",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 2,
    padding: 5,
    alignSelf: "center",
    shadowColor: "grey",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 40,
    justifyContent: "space-around",
  },
  //Music Tab
  Controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 20,
    width: "100%",
  },
});
