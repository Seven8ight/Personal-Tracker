import { styles } from "./Styles";
import { Icon } from "./Constants/Icon";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Pressable } from "react-native";

type Style<K extends string | number | symbol> = {
  [k in K]: number;
};

const TabBarBtn = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  label,
}: {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: any;
  color: string;
  label: any;
}): React.ReactNode => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused == "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.TabBarItem}
    >
      {Icon[
        routeName == "index"
          ? "index"
          : routeName == "Profile"
          ? "Profile"
          : "Timer"
      ]({
        color: isFocused ? "brown" : "black",
      })}

      <Animated.Text
        style={[{ color: isFocused ? "brown" : "black" }, animatedTextStyle]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarBtn;
