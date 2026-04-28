type Props = { title: string };

export default function Placeholder({ title }: Props) {
  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <div className="mt-6 rounded-xl border border-[#1f1f1f] bg-[#111111] p-12 text-center">
        <div className="text-lg font-medium text-white">Em breve</div>
        <p className="mt-2 text-sm text-neutral-400">
          Esta seção está em desenvolvimento.
        </p>
      </div>
    </div>
  );
}
