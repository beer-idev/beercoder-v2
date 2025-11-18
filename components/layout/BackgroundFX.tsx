export default function BackgroundFX() {
  return (
    <>
      {/* animated blurred blobs (use theme colors) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* morphing blobs */}
        <div className="absolute -top-24 -left-24 h-80 w-80 bg-[color:var(--dusk-blue)]/60 blur-3xl will-change-transform will-change-[border-radius] animate-[blobA_22s_ease-in-out_infinite]" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 bg-[color:var(--tropical-teal)]/45 blur-3xl will-change-transform will-change-[border-radius] animate-[blobB_26s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 bg-[color:var(--neon-ice)]/28 blur-3xl will-change-transform will-change-[border-radius] animate-[blobC_30s_ease-in-out_infinite]" />
        {/* subtle radial gradient wash */}
        <div className="absolute inset-0 -z-10 opacity-25 [background:radial-gradient(1200px_600px_at_30%_10%,rgba(91,192,190,0.18),transparent),radial-gradient(800px_500px_at_90%_60%,rgba(58,80,107,0.18),transparent)]" />
      </div>
    </>
  );
}
