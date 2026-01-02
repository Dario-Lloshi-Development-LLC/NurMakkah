import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppSettings } from '../../../core/types';
import { getLocalizedTextWithFallback, shouldUseRTL } from '../../../core/utils';
import { APP_CONFIG } from '../../../core/constants';

interface FeatureCardProps {
    icon: string;
    title: any; // MultilingualTitle
    description: any; // MultilingualDescription
    onPress: () => void;
    color?: string;
    settings: AppSettings;
}

export const FeatureCard: React.FC<FeatureCardProps> = React.memo(({
    icon,
    title,
    description,
    onPress,
    color = APP_CONFIG.theme.primary,
    settings,
}: FeatureCardProps) => {
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
        }).start();
    }, [animatedValue]);

    const isCardRTL = shouldUseRTL(settings);
    const titleText = getLocalizedTextWithFallback(title, settings);
    const descriptionText = getLocalizedTextWithFallback(description, settings);

    return (
        <Animated.View
            style={[
                styles.featureCard,
                {
                    transform: [
                        {
                            scale: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.95, 1],
                            }),
                        },
                        {
                            translateY: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [50, 0],
                            }),
                        },
                    ],
                },
            ]}
        >
            <TouchableOpacity
                style={[styles.cardContainer, { borderLeftColor: color }]}
                onPress={onPress}
                activeOpacity={0.7}
            >
                <View style={styles.cardContent}>
                    <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
                        <Icon name={icon} size={24} color={color} />
                    </View>

                    <View style={styles.textContainer}>
                        <Text
                            style={[
                                styles.cardTitle,
                                {
                                    color,
                                    textAlign: isCardRTL ? 'right' : 'left',
                                    writingDirection: isCardRTL ? 'rtl' : 'ltr',
                                },
                            ]}
                        >
                            {titleText}
                        </Text>
                        <Text
                            style={[
                                styles.cardDescription,
                                {
                                    textAlign: isCardRTL ? 'right' : 'left',
                                    writingDirection: isCardRTL ? 'rtl' : 'ltr',
                                },
                            ]}
                            numberOfLines={2}
                        >
                            {descriptionText}
                        </Text>
                    </View>

                    <Icon
                        name="chevron-right"
                        size={20}
                        color={APP_CONFIG.theme.textSecondary}
                        style={[
                            styles.chevron,
                            { transform: [{ rotate: isCardRTL ? '180deg' : '0deg' }] }
                        ]}
                    />
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    featureCard: {
        marginBottom: 16,
    },
    cardContainer: {
        backgroundColor: APP_CONFIG.theme.surface,
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 14,
        color: APP_CONFIG.theme.textSecondary,
        lineHeight: 20,
    },
    chevron: {
        marginLeft: 16,
    },
});
