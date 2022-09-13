import { View, Text, StyleSheet, Dimensions } from "react-native";
import { React, useState } from "react";
import {
  Card as CardView,
  IconButton,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import useAuth from "../useAuth";
const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio + 59;

const Card = ({ data }) => {
  const { Delete, setTransferPointsFromCompany } = useAuth();

  const { item, setItemHeight, setVisible: setTransferVisible } = data;
  const onLayout = (e) => {
    setItemHeight(e.nativeEvent.layout.height + 24);
  };
  const RightContent = (props) => (
    <>
      <IconButton {...props} icon="delete" onPress={showDialog} />
      <IconButton
        {...props}
        icon="swap-horizontal-bold"
        onPress={() => {
          setTransferVisible(true);
          setTransferPointsFromCompany(item);
        }}
      />
    </>
  );
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // const [visible2, setVisible2] = useState(false);

  // const showModal = () => setVisible2(true);

  // const hideModal = () => setVisible2(false);

  const AreYouSure = () => (
    <Provider>
      <View style={styles.dialogContainer}>
        <Portal theme={{ colors: { backdrop: "transparent" } }}>
          <Dialog
            style={styles.dialog}
            visible={visible}
            onDismiss={hideDialog}
          >
            <Dialog.Title>Delete Card</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Are You Sure You Want to Delete {item.Company} Card?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>No</Button>
              <Button
                onPress={() => {
                  Delete(item.Company);
                  setVisible(false);
                }}
              >
                Yes
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );

  // const TransferPointsDialog = () => (
  //   <View style={styles.dialogContainer}>
  //     <Provider>
  //       <Portal>
  //         <Modal
  //           style={styles.dialog}
  //           visible={visible2}
  //           onDismiss={hideModal}
  //           contentContainerStyle={{ alignSelf: "center" }}
  //         >
  //           <View>
  //             <Title>Transfer Points</Title>

  //             <Paragraph>Are You Sure You Want to Delete Card?</Paragraph>

  //             <View style={styles.txtContentContainer}>
  //               <Button
  //                 color="#5F9DA5"
  //                 mode="contained"
  //                 dark={true}
  //                 onPress={hideModal}
  //               >
  //                 No
  //               </Button>
  //               <Button
  //                 onPress={() => {
  //                   // Delete(item.Company);
  //                   setVisible2(false);
  //                 }}
  //               >
  //                 Yes
  //               </Button>
  //             </View>
  //           </View>
  //         </Modal>
  //       </Portal>
  //     </Provider>
  //   </View>
  // );

  return (
    <CardView style={styles.Card} onLayout={onLayout}>
      <CardView.Title
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
        title={item.Company}
        subtitle={"Points: " + item.Points}
        right={RightContent}
      />
      <CardView.Cover
        style={styles.CardCover}
        source={{
          uri: item.Logo,
        }}
      />
      {AreYouSure()}
    </CardView>
  );
};
const styles = StyleSheet.create({
  Card: {
    width: CARD_WIDTH + 35,
    height: CARD_HEIGHT + 27,
    borderRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  CardCover: {
    // flex: 1,
    borderRadius: 30,
    borderBottomLeftRadius: 30,
    // width: "90%",
    // height: "100%",
    resizeMode: "cover",
  },
  dialog: {
    borderRadius: 30,
  },
  dialogContainer: {
    // width: "150%",
    // height: "150%",
    // backgroundColor: "transparent",
  },
});

export default Card;
