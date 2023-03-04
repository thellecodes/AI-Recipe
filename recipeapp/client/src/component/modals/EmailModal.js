import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Input,
  FormLabel,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetResult,
  resetSent,
  sendEmail,
  setSending,
} from "../../store/slices/recipe";
import { RecipeSchema } from "../../utils/yup";

function EmailModal({ isOpen, onOpen, onClose }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { result, sending, sent } = useSelector((state) => state.recipe);

  const onSend = async (values) => {
    dispatch(setSending());
    dispatch(
      sendEmail({
        ...values,
        result,
      })
    );

    //TODO: close modal after send
  };

  useEffect(() => {
    if (sent) {
      dispatch(resetResult());
      toast({
        title: "Cuisine Sent",
        description: "Your Cuisine has ben sent",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => {
          dispatch(resetSent());
        },
      });
    }
  }, [sent]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontSize={"14px"}>
          <ModalHeader>Recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                email: "",
                firstname: "",
                lastname: "",
              }}
              validationSchema={RecipeSchema}
              onSubmit={(values, { resetForm }) => {
                onSend(values);
              }}
            >
              {({ errors, values, setFieldValue }) => (
                <Form>
                  <FormControl>
                    <FormLabel fontSize="14px">First Name</FormLabel>

                    <Input
                      value={values.firstname}
                      borderColor={errors && errors.firstname ? "red" : "black"}
                      onChange={(e) =>
                        setFieldValue("firstname", e.target.value)
                      }
                      _active={"unset"}
                      _hover="unset"
                      outline={"unset"}
                      boxShadow="none"
                      placeholder="Enter your first name"
                      borderRadius={"unset"}
                      borderWidth={"1px"}
                      type="text"
                    />
                  </FormControl>

                  <FormControl mt="17px">
                    <FormLabel fontSize="14px">Last Name</FormLabel>

                    <Input
                      value={values.lastname}
                      borderColor={errors && errors.lastname ? "red" : "black"}
                      onChange={(e) =>
                        setFieldValue("lastname", e.target.value)
                      }
                      _active={"unset"}
                      _hover="unset"
                      outline={"unset"}
                      boxShadow="none"
                      placeholder="Enter your last name"
                      borderRadius={"unset"}
                      borderWidth={"1px"}
                      type="text"
                    />
                  </FormControl>

                  <FormControl mt="17px">
                    <FormLabel fontSize="14px">Your email address</FormLabel>

                    <Input
                      value={values.email}
                      borderColor={errors && errors.email ? "red" : "black"}
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      _active={"unset"}
                      _hover="unset"
                      outline={"unset"}
                      boxShadow="none"
                      placeholder="Enter your email"
                      borderRadius={"unset"}
                      borderWidth={"1px"}
                      type="email"
                    />
                  </FormControl>

                  <Button
                    isLoading={sending}
                    type="submit"
                    paddingY={"20px"}
                    _hover={"unset"}
                    _active={"unset"}
                    border={"unset"}
                    borderRadius="unset"
                    fontSize={"14px"}
                    bg="#2E25F2"
                    color="white"
                    mt="17px"
                  >
                    Get Recipe
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter>
            <Text>
              To receive this recipe, you will be opted-in to receive emails,
              advertisements and future promotional offers.
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EmailModal;
