import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2, Send } from 'lucide-react';
import FormInput from './FormInput.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import SuccessMessage from './SuccessMessage.jsx';
import { serviceOptions } from '../data/services.js';
import { rules, MESSAGE_MAX } from '../utils/validators.js';
import { clearEnquiryError, resetEnquiry, submitEnquiry } from '../store/slices/enquirySlice.js';

const emptyValues = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  subject: '',
  message: '',
  consent: false,
  website: '', // honeypot: real visitors never see or fill this
};

export default function EnquiryForm({ defaultService = '' }) {
  const dispatch = useDispatch();
  const { status, error, fieldErrors } = useSelector((state) => state.enquiry);
  const isLoading = status === 'loading';
  const [sentTo, setSentTo] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onTouched', defaultValues: { ...emptyValues, service: defaultService } });

  const messageLength = (watch('message') || '').length;

  // Clear any old result when the form mounts again.
  useEffect(() => {
    dispatch(resetEnquiry());
  }, [dispatch]);

  // Show server-side field errors next to the matching fields.
  useEffect(() => {
    if (fieldErrors) {
      Object.entries(fieldErrors).forEach(([field, message]) => setError(field, { type: 'server', message }));
    }
  }, [fieldErrors, setError]);

  const onSubmit = async (values) => {
    const service = serviceOptions.find((option) => option.value === values.service);
    const result = await dispatch(
      submitEnquiry({
        ...values,
        service: service ? service.label : '',
      })
    );
    if (submitEnquiry.fulfilled.match(result)) {
      setSentTo(values.email);
      reset({ ...emptyValues });
    }
  };

  if (status === 'succeeded') {
    return (
      <SuccessMessage
        title="Your enquiry has been sent"
        action={
          <button
            type="button"
            className="text-link"
            onClick={() => {
              dispatch(resetEnquiry());
            }}
          >
            Send another enquiry
          </button>
        }
      >
        Thank you. We have received your message and will reply to {sentTo || 'you'} soon.
      </SuccessMessage>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate onChange={() => error && dispatch(clearEnquiryError())}>
      {/* Honeypot field: hidden from people and assistive tech, attractive to bots */}
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      <div className="enquiry-form__grid">
        <FormInput
          label="Full name"
          required
          autoComplete="name"
          error={errors.fullName?.message}
          {...register('fullName', rules.fullName)}
        />
        <FormInput
          label="Business email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          error={errors.email?.message}
          {...register('email', rules.email)}
        />
        <FormInput
          label="Phone number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          error={errors.phone?.message}
          {...register('phone', rules.phone)}
        />
        <FormInput
          label="Company or business name"
          autoComplete="organization"
          error={errors.company?.message}
          {...register('company', rules.company)}
        />
        <FormInput
          as="select"
          label="Service required"
          error={errors.service?.message}
          {...register('service')}
        >
          <option value="">Select a service</option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FormInput>
        <FormInput
          label="Subject"
          required
          error={errors.subject?.message}
          {...register('subject', rules.subject)}
        />
      </div>

      <FormInput
        as="textarea"
        label="Message"
        rows={6}
        required
        hint={`${messageLength} / ${MESSAGE_MAX} characters`}
        error={errors.message?.message}
        {...register('message', rules.message)}
      />

      <div className={`consent ${errors.consent ? 'consent--error' : ''}`}>
        <label className="consent__label">
          <input
            type="checkbox"
            aria-invalid={errors.consent ? 'true' : 'false'}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            {...register('consent', rules.consent)}
          />
          <span>
            I agree that the firm may use these details to respond to my enquiry. I understand that
            my message is not a professional engagement until it is confirmed in writing.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="field__error" role="alert">
            {errors.consent.message}
          </p>
        )}
      </div>

      {status === 'failed' && error && <ErrorMessage title="We could not send your enquiry">{error}</ErrorMessage>}

      <button type="submit" className="btn btn--gold enquiry-form__submit" disabled={isLoading} aria-busy={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="spin" size={18} aria-hidden="true" /> Sending
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" /> Send enquiry
          </>
        )}
      </button>
    </form>
  );
}
