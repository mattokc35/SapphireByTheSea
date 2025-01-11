import "./GuestInfoPaymentModal.scss";
import React, { useState, useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import { Typography, Button } from "@mui/material";
import PriceTooltip from "../tooltips/PriceTooltip";
import {
  createContractEmailDataObject,
  formatDate,
  generateProductName,
  resetFormData,
} from "./GuestInfoModalHelper";
import {
  getCurrentDate,
  calculatePromoCodePrice,
  formatPhoneNumber,
} from "../../helpers/helperFunctions";
import {
  owners,
  checkinTime,
  checkoutTime,
  contractUrl,
  guestInstructions,
} from "@/constants/constants";
import Form from "react-bootstrap/Form";
import {
  createCheckoutSession,
  verifyPromoCode,
  createVerificationSession,
} from "../../network/networkRequests";
import ReCAPTCHA from "react-google-recaptcha";
import ValidationText from "../validation-text/ValidationText";
import {
  GuestInfoPaymentPageModalProps,
  GuestInfoFormData,
} from "@/types/types";

const GuestInfoPaymentPageModal: React.FC<GuestInfoPaymentPageModalProps> = (
  props: GuestInfoPaymentPageModalProps
) => {
  const form = useRef<HTMLFormElement>(null);
  const recaptcha = useRef<ReCAPTCHA>(null);
  const [isContractViewed, setIsContractViewed] = useState<boolean | undefined>(
    undefined
  );
  const [isInquiryValid, setIsInquiryValid] = useState<boolean | undefined>(
    undefined
  );
  const [inquiryErrorText, setInquiryErrorText] = useState<string>("");
  const [showCaptchaValidationMessage, setShowCaptchaValidationMessage] =
    useState(false);
  const [captchaValue, setCaptchaValue] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoCodeValid, setIsPromoCodeValid] = useState<boolean | undefined>(
    undefined
  );
  const [promoCodeDiscountPercentage, setPromoCodeDiscountPercentage] =
    useState<number>(0);
  const [promoCodeDiscountPrice, setPromoCodeDiscountPrice] = useState<number>(
    props.discountedNightsPrice
  );
  const [totalPrice, setTotalPrice] = useState<number>(props.price);
  const [totalBeforeTax, setTotalBeforeTax] = useState<number>(
    props.totalBeforeTax
  );
  const [tax, setTax] = useState<number>(props.tax);
  const [enableProceedToPayment, setEnableProceedToPayment] = useState(true);
  const [promoCodePriceAmount, setPromoCodePriceAmount] = useState<number>(0);
  const formattedStartDate = formatDate(props.startDate.substr(1, 10));
  const formattedEndDate = formatDate(props.endDate.substr(1, 10));

  useEffect(() => {
    const promoCodePriceArray = calculatePromoCodePrice(
      props.nightsPrice,
      props.discountedNightsPrice,
      promoCodeDiscountPercentage,
      props.petFee
    );
    setPromoCodeDiscountPrice(promoCodePriceArray[0]);
    setTotalPrice(promoCodePriceArray[1]);
    setTax(promoCodePriceArray[2]);
    setPromoCodePriceAmount(promoCodePriceArray[3]);
    setTotalBeforeTax(promoCodePriceArray[4]);
  }, [promoCodeDiscountPercentage]);

  useEffect(() => {
    const canProceedToPayment =
      isPromoCodeValid === true &&
      checkRecaptcha() &&
      isContractViewed === true;
    //setEnableProceedToPayment(canProceedToPayment);
  }, [isPromoCodeValid, captchaValue, isContractViewed]);

  const [formData, setFormData] = useState<GuestInfoFormData>({
    name: "",
    email: "",
    phoneNumber: "",
    comments: "",
    adults: props.adults,
    children: props.selectedChildren,
    price: totalPrice,
    tax: tax,
    pets: props.pets,
    infants: props.infants,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    promoCode: promoCode,
    promoCodeDiscountPercentage: promoCodeDiscountPercentage,
    promoCodeDiscountPrice: promoCodeDiscountPrice,
    nightsPrice: props.nightsPrice,
    numberOfNights: props.numberOfNights,
    discountedNightsPrice: props.discountedNightsPrice,
  });

  const [validated, setValidated] = useState(false);

  const verifyIdentity = async () => {
    let isIdVerifiedPromise = await createVerificationSession();
    return isIdVerifiedPromise;
  };

  const checkRecaptcha = () => {
    const captchaValue = recaptcha.current!.getValue();
    setCaptchaValue(!!captchaValue);
    if (!captchaValue) {
      setShowCaptchaValidationMessage(true);
      return false;
    }
    return true;
  };

  const validateForm = (form: HTMLFormElement): boolean => {
    if (!form.checkValidity()) {
      setIsInquiryValid(false);
      setInquiryErrorText("Please fill out all form fields.");
      return false;
    }

    const phoneNumber = formData.phoneNumber;
    if (phoneNumber.length !== 12) {
      setIsInquiryValid(false);
      setInquiryErrorText("Please enter a valid phone number.");
      return false;
    }

    return true;
  };

  const handleInquirySubmission = async (form: HTMLFormElement) => {
    // Format the phone number
    const formattedPhoneNumber = formatPhoneNumber(formData.phoneNumber);
    const updatedFormData = {
      ...formData,
      phoneNumber: formattedPhoneNumber,
      promoCodeDiscountPrice: promoCodeDiscountPrice,
      promoCodeDiscountPercentage: promoCodeDiscountPercentage,
      tax: tax,
      price: totalPrice,
      petFee: props.petFee || 0,
      promoCode: promoCode,
    };
    if (!checkRecaptcha()) return;
    const isValid = validateForm(form);
    if (!isValid) return;
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_1!,
        updatedFormData as any,
        process.env.NEXT_PUBLIC_EMAIL_JS_KEY!
      );
      setIsInquiryValid(true);
      setValidated(true);
      setTimeout(() => {
        // Clear the form
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...resetFormData(props),
        }));
        setPromoCode("");
        setPromoCodeDiscountPercentage(0);
        setPromoCodeDiscountPrice(props.discountedNightsPrice);
        setIsPromoCodeValid(undefined);
        setShowCaptchaValidationMessage(false);
        recaptcha.current?.reset();
      }, 2000);
    } catch (error: any) {
      console.error(error);
      setIsInquiryValid(false);
      setInquiryErrorText("Error submitting inquiry, please try again");
    }
  };

  const handleBook = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!checkRecaptcha()) return;
    const form = event.currentTarget.form as HTMLFormElement;
    if (!validateForm(form)) return;

    try {
      if (!(await verifyIdentity())) {
        setInquiryErrorText("Identity verification failed. Please try again.");
        return;
      }

      const currentDate = getCurrentDate();
      const productName = generateProductName(
        props.startDate,
        props.endDate,
        formData.name
      );
      const formattedPrice = (totalPrice * 100).toFixed(4);
      const contractEmailDataObject = createContractEmailDataObject(
        currentDate,
        formData,
        owners,
        promoCode,
        promoCodeDiscountPercentage,
        promoCodeDiscountPrice,
        props.startDate,
        props.endDate,
        totalPrice,
        props.petFee,
        checkinTime,
        checkoutTime,
        props.discountPercentage,
        props.averageNightlyPrice,
        props.numberOfNights,
        props.adults + props.selectedChildren + props.infants
      );
      const response = await createCheckoutSession(
        productName,
        formattedPrice,
        contractEmailDataObject
      );
      if (response) {
        window.location.href = response.url;
      } else {
        console.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const handleSubmitInquiry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.current) {
      handleInquirySubmission(form.current);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsInquiryValid(undefined);
    setInquiryErrorText("");
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePromoCodeValidation = () => {
    verifyPromoCode(promoCode)
      .then((promoCodeData) => {
        if (promoCodeData) {
          setIsPromoCodeValid(promoCodeData.isPromoValid);
          setPromoCodeDiscountPercentage(promoCodeData.discountPercentage);
        }
      })
      .catch((error) => {
        console.error("Error verifying promo code:", error);
      });
  };

  return (
    <>
      <div className="checkout-info-container">
        <Typography variant="body1">
          <strong>Reservation Dates:</strong> {formattedStartDate} to{" "}
          {formattedEndDate}
        </Typography>
        <Typography variant="body1">
          <strong>Adults:</strong> {props.adults} <strong>Children:</strong>{" "}
          {props.selectedChildren} <strong>Infants:</strong> {props.infants}{" "}
          <strong>Pets:</strong> {props.pets}
        </Typography>
        <Typography>
          <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
        </Typography>

        <PriceTooltip
          numberOfNights={props.numberOfNights}
          nightsPrice={props.nightsPrice}
          hasDiscount={props.hasDiscount}
          discountedNightsAmount={props.discountedNightsAmount}
          promoCodeDiscountPercentage={promoCodeDiscountPercentage}
          petFee={props.petFee}
          totalBeforeTax={totalBeforeTax}
          totalPrice={totalPrice}
          promoCodePriceAmount={promoCodePriceAmount}
          tax={tax}
          promoCode={promoCode}
        />
      </div>
      <Typography
        variant="body1"
        className="guest-instructions"
        sx={{ marginBottom: "10px" }}
      >
        {guestInstructions}
      </Typography>
      <Form validated={validated} onSubmit={handleSubmitInquiry} ref={form}>
        <Form.Group
          className="mb-3"
          controlId="formBasicName"
          onSubmit={handleSubmitInquiry}
        >
          <Form.Label>Guest Name</Form.Label>
          <Form.Control
            name="name"
            onChange={handleChange}
            value={formData.name}
            required
            type="name"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            {`We'll never share your email with anyone else.`}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPhoneNumber" className="mb-3">
          <Form.Label>
            Phone Number{" "}
            <span style={{ fontSize: "79%" }}>
              {`(Enter country code first, ex: "01" for United States)`}
            </span>
          </Form.Label>
          <Form.Control
            name="phoneNumber"
            placeholder="Phone Number"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            size="sm"
            type="tel"
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Questions/Comments</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="comments"
            value={formData.comments}
            as="textarea"
            rows={3}
          />
          <Form.Group controlId="formBasicPromoCode" className="mb-3">
            <Form.Label>Promo Code</Form.Label>
            <Form.Control
              name="promoCode"
              onChange={(e) => {
                setIsPromoCodeValid(undefined);
                setPromoCode(e.target.value);
              }}
              value={promoCode}
              type="text"
              placeholder={`Have a promo code? Enter here and press "Validate"`}
            ></Form.Control>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <ValidationText
                isValid={isPromoCodeValid}
                validationText={
                  "Promo code is valid! Check price breakdown for discount details."
                }
                errorText={"Promo code is not valid"}
                starterText={""}
              />
            </div>
            <div className="button-container" style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                onClick={handlePromoCodeValidation}
                className="custom-primary-button"
                sx={{ background: "#0f52ba" }}
              >
                Validate Promo Code
              </Button>
            </div>
          </Form.Group>
        </Form.Group>
        <ReCAPTCHA
          onChange={checkRecaptcha}
          ref={recaptcha}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        />
        {showCaptchaValidationMessage && (
          <ValidationText
            isValid={captchaValue}
            starterText={""}
            validationText={"ReCAPTCHAv3 Completed!"}
            errorText={"Please complete the ReCAPTCHAv3 to proceed."}
          ></ValidationText>
        )}
        <div className="button-container">
          <Button
            className="custom-primary-button"
            variant="contained"
            type="submit"
            sx={{ marginRight: "5px", background: "#0f52ba" }}
          >
            Send An Inquiry
          </Button>
          <Button
            onClick={() => {
              try {
                window.open(contractUrl, "_blank");
                setIsContractViewed(true);
              } catch (e) {
                console.error("Contract not opened successfully: ", e);
                setIsContractViewed(false);
              }
            }}
            className="custom-primary-button"
            variant="contained"
            sx={{ background: "#0f52ba" }}
          >
            View Contract
          </Button>

          <Button
            onClick={handleBook}
            className="custom-primary-button"
            variant="contained"
            sx={{ background: "#0f52ba" }}
            disabled={enableProceedToPayment}
          >
            Book Now
          </Button>
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          {isInquiryValid !== undefined && (
            <ValidationText
              isValid={isInquiryValid}
              validationText={
                "Thanks for the inquiry! We'll contact you shortly."
              }
              errorText={inquiryErrorText}
              starterText={""}
            />
          )}

          {isContractViewed !== undefined && (
            <ValidationText
              isValid={isContractViewed}
              validationText={"Contract viewed successfully!"}
              errorText={"Contract loaded unsuccessfully. Please try again."}
              starterText={""}
            />
          )}
        </div>
      </Form>
    </>
  );
};

export default GuestInfoPaymentPageModal;
