import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { View } from '../components/Themed';
import {SpoonGrocery} from "../types";
// import { FollowerAttrData } from '../fetchGithub/GithubFollower';
// import { FollowerStackNavigationProp } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default function FridgeView(
  props: {
    navigation: any,
    groceries: SpoonGrocery[] | undefined
  },
) {
  const { navigation, groceries } = props;
  return (
    <View style={{ ...styles.container, width: '100%' }}>
      {console.log("INTO FRIDGE VIEW!!!!!!!!!!!!!!!!!!!!!!!!")}
      <ScrollView style={{ width: '100%' }}>
        {
          groceries
          ? groceries.map((grocery, index) =>
            (
              <ListItem
                // button
                // onPress={() => {
                //   console.log(`click on follower listitem ${follower.username}`);
                //   navigation.navigate('Profile', { userName: follower.username });
                // }}
                key={`i${JSON.stringify(index)}`}
                bottomDivider
              >
                {grocery.images ? <Avatar source={{ uri: grocery?.images[0] }} /> : null}
                <ListItem.Content>
                  <ListItem.Title>{grocery.title}</ListItem.Title>
                  {grocery.title ? (
                      <ListItem.Subtitle>
                        {`expire: ${grocery.expiration}`}
                      </ListItem.Subtitle>
                    )
                    : null}
                </ListItem.Content>
              </ListItem>
            )) : null}
      </ScrollView>

    </View>
  );
}
