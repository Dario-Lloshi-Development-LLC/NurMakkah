import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import { useNavigationContext } from '../shared/navigation/AppNavigator';
import { AppSettings } from '../core/types';
import { getLocalizedTextWithFallback, shouldUseRTL } from '../core/utils';
import { APP_CONFIG } from '../core/constants';

interface SettingItemProps {
    title: string;
    subtitle?: string;
    value: any;
    onValueChange?: (value: any) => void;
    type: 'toggle' | 'selector' | 'action';
    options?: { label: string; value: any }[];
    icon?: string;
    iconColor?: string;
    settings: AppSettings;
}

const SettingItem: React.FC<SettingItemProps> = ({
    title,
    subtitle,
    value,
    onValueChange,
    type,
    options,
    icon,
    iconColor = APP_CONFIG.theme.primary,
    settings,
}) => {
    const isRTL = shouldUseRTL(settings);

    const handlePress = useCallback(() => {
        if (type === 'action' && onValueChange) {
            onValueChange(value);
        } else if (type === 'selector' && options && onValueChange) {
            Alert.alert(
                title,
                undefined,
                options.map(option => ({
                    text: option.label,
                    onPress: () => onValueChange(option.value),
                    style: value === option.value ? 'default' : 'cancel',
                }))
            );
        }
    }, [type, options, value, onValueChange, title]);

    const content = (
        <View style={[styles.settingItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            {icon && (
                <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
                    <Icon name={icon} size={22} color={iconColor} />
                </View>
            )}

            <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
                    {title}
                </Text>
                {subtitle && (
                    <Text
                        style={[
                            styles.settingSubtitle,
                            { textAlign: isRTL ? 'right' : 'left' },
                        ]}
                    >
                        {subtitle}
                    </Text>
                )}
            </View>

            {type === 'toggle' && (
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: '#eee', true: `${APP_CONFIG.theme.primary}50` }}
                    thumbColor={value ? APP_CONFIG.theme.primary : '#fff'}
                />
            )}

            {type === 'selector' && (
                <View style={[styles.selectorContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <Text style={styles.selectorValue}>
                        {options?.find(opt => opt.value === value)?.label || value}
                    </Text>
                    <Icon name={isRTL ? "chevron-left" : "chevron-right"} size={20} color={APP_CONFIG.theme.textSecondary} />
                </View>
            )}

            {type === 'action' && (
                <Icon name={isRTL ? "chevron-left" : "chevron-right"} size={20} color={APP_CONFIG.theme.textSecondary} />
            )}
        </View>
    );

    if (type === 'toggle') {
        return content;
    }

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            {content}
        </TouchableOpacity>
    );
};

const SettingsScreen: React.FC = () => {
    const { settings, updateSettings } = useNavigationContext();
    const navigation = useNavigation();
    const isRTL = shouldUseRTL(settings);

    const handleSettingChange = useCallback(
        (key: keyof AppSettings, value: any) => {
            updateSettings({ [key]: value });
        },
        [updateSettings]
    );

    const handleAbout = useCallback(() => {
        navigation.navigate('About' as never);
    }, [navigation]);

    const languageOptions = [
        { label: 'Shqip (Albanian)', value: 'albanian' },
        { label: 'العربية (Arabic)', value: 'arabic' },
        { label: 'English', value: 'english' },
    ];

    const fontSizeOptions = [
        { label: 'Vogël (Small)', value: 'small' },
        { label: 'Mesme (Medium)', value: 'medium' },
        { label: 'Madhe (Large)', value: 'large' },
    ];

    const loc = (texts: { [key: string]: string }) => getLocalizedTextWithFallback(texts, settings);

    return (
        <View style={[styles.container, { backgroundColor: APP_CONFIG.theme.background }]}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
                        {loc({ albanian: 'Gjuha & Pamja', arabic: 'اللغة والعرض', english: 'Language & Display' })}
                    </Text>
                    <View style={styles.card}>
                        <SettingItem
                            title={loc({ albanian: 'Gjuha', arabic: 'اللغة', english: 'Language' })}
                            subtitle={loc({ albanian: 'Zgjidhni gjuhën e aplikacionit', arabic: 'اختر لغة التطبيق', english: 'Choose app language' })}
                            value={settings.language}
                            onValueChange={(value) => handleSettingChange('language', value)}
                            type="selector"
                            options={languageOptions}
                            icon="language"
                            settings={settings}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            title={loc({ albanian: 'Madhësia e Shkrimit', arabic: 'حجم الخط', english: 'Font Size' })}
                            subtitle={loc({ albanian: 'Rregullo madhësinë e tekstit', arabic: 'ضبط حجم النص', english: 'Adjust text size' })}
                            value={settings.fontSize}
                            onValueChange={(value) => handleSettingChange('fontSize', value)}
                            type="selector"
                            options={fontSizeOptions}
                            icon="format-size"
                            settings={settings}
                        />
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
                        {loc({ albanian: 'Përmbajtja', arabic: 'المحتوى', english: 'Content' })}
                    </Text>
                    <View style={styles.card}>
                        <SettingItem
                            title={loc({ albanian: 'Shfaq Arabishten', arabic: 'عرض النص العربي', english: 'Show Arabic Text' })}
                            value={settings.showArabicText}
                            onValueChange={(value) => handleSettingChange('showArabicText', value)}
                            type="toggle"
                            icon="translate"
                            settings={settings}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            title={loc({ albanian: 'Transliterimi', arabic: 'الترجمة الصوتية', english: 'Transliteration' })}
                            value={settings.showTransliteration}
                            onValueChange={(value) => handleSettingChange('showTransliteration', value)}
                            type="toggle"
                            icon="text-fields"
                            settings={settings}
                        />
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
                        {loc({ albanian: 'Informacion', arabic: 'معلومات', english: 'Information' })}
                    </Text>
                    <View style={styles.card}>
                        <SettingItem
                            title={loc({ albanian: 'Rreth Nur Makkah', arabic: 'حول نور مكة', english: 'About Nur Makkah' })}
                            value={null}
                            onValueChange={handleAbout}
                            type="action"
                            icon="info"
                            iconColor="#607D8B"
                            settings={settings}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Nur Makkah v{APP_CONFIG.version}</Text>
                    <Text style={styles.footerSubtext}>
                        © 2026 - All content verified
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    sectionContainer: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: APP_CONFIG.theme.textSecondary,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
        paddingHorizontal: 8,
    },
    card: {
        backgroundColor: APP_CONFIG.theme.surface,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 16,
    },
    settingItem: {
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    settingContent: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: APP_CONFIG.theme.text,
    },
    settingSubtitle: {
        fontSize: 13,
        color: APP_CONFIG.theme.textSecondary,
        marginTop: 2,
    },
    selectorContainer: {
        alignItems: 'center',
    },
    selectorValue: {
        fontSize: 15,
        color: APP_CONFIG.theme.primary,
        fontWeight: '600',
        marginHorizontal: 8,
    },
    footer: {
        padding: 40,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        fontWeight: '700',
        color: APP_CONFIG.theme.text,
        marginBottom: 4,
    },
    footerSubtext: {
        fontSize: 12,
        color: APP_CONFIG.theme.textSecondary,
    },
});

export default SettingsScreen;
