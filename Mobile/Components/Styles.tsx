import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  IntroView: {
    width: 300,
    height: 200,
    borderRadius: 10,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 10, height: 10 },
    borderWidth: 2,
    borderColor: "black",
  },
  IntroHeader: {
    fontSize: 30,
  },
});
