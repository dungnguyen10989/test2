import React from 'react';
import { View, StyleSheet } from 'react-native';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  }
});

export default class FeedItem extends React.Component {
  render() {
    const { feed } = this.props;
    const title = feed.action === 'wall_post' ? feed.objects.content : feed.title;
    return (
      <View style={styles.wrapper}>
        <Header
          actor={feed.actor}
          date={feed.created}
        />
        <Content
          title={title}
          image={feed.objects.image || null}
        />
        <Footer
          likeCount={feed.likeCount}
          commentCount={feed.commentCount}
        />
      </View>
    );
  }
}
