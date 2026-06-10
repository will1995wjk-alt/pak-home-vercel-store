import WhatsAppButton from "./WhatsAppButton";

export default function WhatsAppFloatingButton() {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <WhatsAppButton label="WhatsApp" />
    </div>
  );
}
