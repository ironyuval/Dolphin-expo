import React from 'react';
import { ImageBackground, View, StyleSheet, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgProps } from 'react-native-svg';

interface BackgroundImageProps {
  src?: ImageSourcePropType | string | React.ComponentType<SvgProps>;
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
  // Check if src is a React component (SVG component)
  const isReactComponent = typeof src === 'function' || (typeof src === 'object' && src && 'prototype' in src && typeof (src as any).prototype?.render === 'function');
  
  const imageSource = typeof src === 'string' ? { uri: src } : (isReactComponent ? undefined : src as ImageSourcePropType);
  const SvgComponent = isReactComponent ? src as React.ComponentType<SvgProps> : null;

  return (
    <View style={[styles.container, className]}>
      {SvgComponent ? (
        <View style={styles.container}>
          <SvgComponent width="100%" height="100%" style={StyleSheet.absoluteFill} />
          {overlay && <View style={styles.overlay} />}
          {gradient && (
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'transparent']}
              style={StyleSheet.absoluteFill}
            />
          )}
          {children && <View style={styles.content}>{children}</View>}
        </View>
      ) : src ? (
        <ImageBackground 
          source={imageSource as ImageSourcePropType}
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
      ) : (
        children && <View style={styles.content}>{children}</View>
      )}
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
