export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0f] z-50">
      <div className="text-center">
        <div className="shuriken-loader mx-auto mb-4" />
        <p className="text-gray-500 text-sm font-body animate-pulse">
          Cargando...
        </p>
      </div>
    </div>
  );
}
