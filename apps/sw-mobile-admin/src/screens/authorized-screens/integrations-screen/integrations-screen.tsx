import { BusinessVideoConferenceIntegrationType, BusinessVideoConferenceType } from "@shortwaits/shared-lib";
import {
  ActivityIndicator,
  BackButton,
  Button,
  Card,
  Discord,
  FacebookLive,
  FormContainer,
  GoogleMeet,
  IconButton,
  Instagram,
  Link,
  MicrosoftTeams,
  Skype,
  Slack,
  Space,
  Switch,
  Text,
  TextField,
  Twitch,
  X,
  YouTube,
  Zoom,
  useForm,
  useTheme,
} from "@shortwaits/shared-ui";
import { truncate } from "lodash";
import React, { FC, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Alert, Linking, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { AuthorizedScreenProps } from "../../../navigation";
import { useUpdateBusinessMutation } from "../../../services";
import { useBusiness } from "../../../store";

const videoConferenceIcons: Record<BusinessVideoConferenceIntegrationType, (props: SvgProps) => React.JSX.Element> = {
  zoom: Zoom,
  googleMeet: GoogleMeet,
  microsoftTeams: MicrosoftTeams,
  youTube: YouTube,
  twitch: Twitch,
  x: X,
  skype: Skype,
  discord: Discord,
  facebookLive: FacebookLive,
  instagram: Instagram,
  slack: Slack,
  custom: Link,
};

export const IntegrationsScreen: FC<AuthorizedScreenProps<"integrations-screen">> = props => {
  const { navigation } = props;

  const intl = useIntl(); // Access the intl object
  const business = useBusiness();
  const { Colors } = useTheme();
  const [videoConferences, setVideoConferences] = useState(business?.videoConferences ?? []);
  const [updateBusiness, updateBusinessStatus] = useUpdateBusinessMutation();

  const { values, touched, setFieldValue, errors, handleSubmit, handleChange } = useForm(
    {
      initialValues: {
        videoConferences: videoConferences ?? [],
      },
      onSubmit: formData => {
        const videoConferences = formData.videoConferences;
        // console.log("\n\n>>>>", JSON.stringify(formData, null, 2));
        updateBusiness({
          businessId: business?._id,
          body: { ...business, videoConferences },
        });
      },
    },
    "updateBusinessIntegrations"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="headerTitle" text={"Integrations"} />,
    });
  }, [intl, navigation]);

  const renderSubmitButton = (
    <Button
      preset="secondary"
      text={intl.formatMessage({ id: "Common.update" })}
      onPress={() => {
        handleSubmit();
      }}
    />
  );
  console.log("Errors >>>", JSON.stringify(errors, null, 2));

  if (updateBusinessStatus.isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <FormContainer preset="fixed" footer={renderSubmitButton} unsafeBottom>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text text={"Video Conferences"} preset="headerTitle" />
        <IconButton iconType="add" iconColor="brandPrimary" withMarginRight onPress={() => console.log("fe")} />
      </View>
      <Space />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {values.videoConferences.map((integration, index) => (
          <SwitchRow
            key={index}
            integration={integration}
            index={index}
            onChangeText={handleChange(`videoConferences[${index}].url`)}
            onActiveChange={value => setFieldValue(`videoConferences[${index}].isActive`, value)}
            isTouched={touched?.videoConferences ? touched.videoConferences[index]?.url : false}
            errors={errors.videoConferences ? errors.videoConferences[index]?.url : ""}
          />
        ))}
      </ScrollView>
    </FormContainer>
  );
};

type SwitchRowProps = {
  index: number;
  integration: BusinessVideoConferenceType;
  onChangeText: (text: string) => void;
  onActiveChange: (value: boolean) => void;
  isTouched: boolean;
  errors: any;
};

const SwitchRow: FC<SwitchRowProps> = props => {
  const { index, integration, onChangeText, onActiveChange, isTouched, errors } = props;
  const { Colors } = useTheme();
  const [isUrlEdit, setIsUrlEdit] = useState(false);
  const Icon = videoConferenceIcons[integration.type];

  const handleSwitchChange = () => {
    onActiveChange(!integration.isActive);
  };
  const openURL = url => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      })
      .catch(err => {
        Alert.alert("An error occurred", err);
      });
  };

  return (
    <Card mode="static" style={{ height: undefined, paddingBottom: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          style={{
            opacity: integration.isActive ? 1 : 0.5,
          }}
        />
        <Text
          text={integration.label}
          style={{
            marginLeft: 10,
            color: integration.isActive ? Colors.text : Colors.disabledText,
          }}
        />
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Switch
            trackColor={{ false: Colors.red1, true: Colors.lightBackground }}
            thumbColor={integration.isActive ? Colors.brandSecondary2 : Colors.gray}
            ios_backgroundColor={Colors.lightBackground}
            onChange={handleSwitchChange}
            value={integration.isActive}
          />
        </View>
      </View>
      {integration.url ? (
        <View style={{ marginTop: 10 }}>
          <Text text={"Link: "} preset={!integration.isActive ? "cardTitle-disabled" : "cardTitle"} />
          <Space size="tiny" />
          <Text
            preset="linkUrl"
            disabled={!integration.isActive}
            style={{ color: integration.isActive ? Colors.blue : Colors.disabledText }}
            text={truncate(integration.url, { length: 60 })}
            onPress={() => openURL(integration.url)}
          />
        </View>
      ) : null}
      {integration.isActive && (
        <View style={{ marginTop: 10 }}>
          <Text text={"Value: "} preset="cardTitle" />
          <Space size="tiny" />
          <TextField
            autoCapitalize="none"
            preset="none"
            multiline
            autoFocus
            style={{
              flex: 1,
              padding: 10,
              paddingTop: 15,
              backgroundColor: Colors.gray,
              borderRadius: 4,
            }}
            value={integration.url}
            onChangeText={onChangeText}
            placeholder={"Enter URL"}
          />
        </View>
      )}
      {errors && isTouched ? (
        <Text
          preset="cardTitle"
          style={{
            ...styles.errorField,
            // width: width * 0.87,
            color: Colors.red3,
          }}
          text={"* " + errors}
        />
      ) : null}
    </Card>
  );
};
const styles = StyleSheet.create({
  errorField: {
    alignSelf: "center",
    textAlign: "right",
    width: "100%",
    marginBottom: 10,
  },
});
