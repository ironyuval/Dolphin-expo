import React from 'react';
import { ImageBackground, View, StyleSheet, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BackgroundImageProps {
  src?: ImageSourcePropType | string;
  alt?: string;
  className?: string;
  overlay?: boolean;
  gradient?: boolean;
  children?: React.ReactNode;
}

export default function BackgroundImage({ 
  src, 
  alt = '', 
  className = '',
  overlay = false,
  gradient = false,
  children 
}: BackgroundImageProps) {
  const imageSource = typeof src === 'string' ? { uri: src } : src;

  return (
    <View style={[styles.container, className]}>
      {src && (
        <ImageBackground 
          source={imageSource}
          style={styles.image}
          resizeMode="cover"
        >
          {overlay && <View style={styles.overlay} />}
          {gradient && (
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'transparent']}
              style={StyleSheet.absoluteFill}
            />
          )}
          {children && <View style={styles.content}>{children}</View>}
        </ImageBackground>
      )}
      {!src && children && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    flex: 1,
  },
});
