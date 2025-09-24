import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";

const TermsAndConditions = () => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200 rounded-xl shadow-md transition-colors duration-300">
                <div className="flex items-center gap-6 pb-10">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-red-500 hover:text-red-500 transition"
                    >
                        <Logo className="h-8 w-8" />
                        <span className="text-lg font-semibold tracking-wide">
                            Nirapod-Parcel
                        </span>
                    </Link>
                </div>

                <h1 className="text-3xl font-bold mb-6 text-center text-red-500">
                    Terms and Conditions for Nirapod Parcel Merchants
                </h1>

                <div className="space-y-8">
                    {/* INTRODUCTION */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 text-red-500">INTRODUCTION</h2>
                        <p>
                            <b>Nirapod Parcel</b> is a logistics company incorporated under the
                            laws of Bangladesh, offering diversified delivery and pick-up
                            services with a focus on e-commerce transactions. This agreement
                            (“Agreement”) is an electronic contract between You (“Client”) and
                            Nirapod Parcel, outlining the terms on which services are provided.
                            By clicking “I accept” and using Nirapod Parcel’s services, you
                            agree to these Terms.
                        </p>
                    </section>

                    {/* SCOPE OF DELIVERY SERVICES */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 text-red-500">
                            SCOPE OF DELIVERY SERVICES
                        </h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <b>Forward Deliveries:</b> Delivery of goods from the Client to
                                customers.
                            </li>
                            <li>
                                <b>Reverse Pickups:</b> Pick-up of goods from customers and
                                delivery back to Client.
                            </li>
                            <li>
                                <b>CoD Services:</b> Cash collection during delivery and
                                remittance to the Client.
                            </li>
                        </ul>
                    </section>

                    {/* CLIENT OBLIGATIONS */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 text-red-500">CLIENT OBLIGATIONS</h2>
                        <p>
                            The Client must ensure proper packaging, accurate product
                            descriptions, legal compliance, and timely readiness of goods for
                            pickup. Clients must not hand over banned, illegal, hazardous, or
                            restricted goods. Any mismatch in declarations will be deemed a
                            breach of policy.
                        </p>
                    </section>

                    {/* NIRAPOD PARCEL OBLIGATIONS */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 text-red-500">
                            NIRAPOD PARCEL OBLIGATIONS
                        </h2>
                        <p>
                            Nirapod Parcel will provide services with reasonable skill, select
                            and pay personnel, ensure SMS confirmation after delivery, and remit
                            CoD payments weekly via bank or mobile transfer.
                        </p>
                    </section>

                    {/* RIGHTS OF NIRAPOD PARCEL */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 text-red-500">
                            RIGHTS OF NIRAPOD PARCEL
                        </h2>
                        <p>
                            Nirapod Parcel reserves the right to reject inadequately packed
                            goods, banned goods, or deliveries outside serviceable areas.
                            Compensation will not be provided for fragile, liquid, or perishable
                            items not packed adequately.
                        </p>
                    </section>

                    {/* REPRESENTATIONS AND WARRANTIES */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 text-red-500">
                            REPRESENTATIONS AND WARRANTIES
                        </h2>
                        <p>
                            Nirapod Parcel assures adequate authority, licenses, and personnel to
                            provide services. The Client assures lawful business conduct, valid
                            product ownership, tax compliance, and exclusion of banned goods.
                        </p>
                    </section>

                    {/* FEES AND PAYMENT TERMS */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 text-red-500">
                            FEES AND PAYMENT TERMS
                        </h2>
                        <p>
                            Fees include VAT and may change from time to time. Invoices are
                            issued monthly and must be paid within 15 days. Disputes must be
                            raised within 7 days, or the invoice is deemed accepted.
                        </p>
                    </section>

                    {/* LIMITATION OF LIABILITY */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 text-red-500">
                            LIMITATION OF LIABILITY
                        </h2>
                        <p>
                            Liability for lost or damaged consignments is limited to the lower
                            of invoice value or BDT 5000. Nirapod Parcel is not liable for
                            indirect or consequential damages.
                        </p>
                    </section>

                    {/* CONFIDENTIALITY */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 text-red-500">CONFIDENTIALITY</h2>
                        <p>
                            Both parties must keep confidential information secure and use it
                            only for the purpose of fulfilling this Agreement. Nirapod Parcel’s
                            digital resources are confidential and proprietary.
                        </p>
                    </section>

                    {/* INDEMNITY */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 text-red-500">INDEMNITY</h2>
                        <p>
                            The Client agrees to indemnify Nirapod Parcel against claims or
                            losses arising from negligence, breach of obligations, third-party
                            claims, or violation of laws.
                        </p>
                    </section>

                    {/* MISCELLANEOUS */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 text-red-500">MISCELLANEOUS</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <b>Assignment:</b> Neither Party may assign without consent,
                                except Nirapod Parcel may assign to affiliates with notice.
                            </li>
                            <li>
                                <b>Force Majeure:</b> Parties are excused from obligations during
                                unforeseen events like natural disasters, war, or pandemics.
                            </li>
                            <li>
                                <b>Law & Jurisdiction:</b> Governed by laws of Bangladesh, with
                                Dhaka courts having jurisdiction.
                            </li>
                            <li>
                                <b>Severability:</b> Invalid provisions shall be replaced with
                                valid ones closest to original intent.
                            </li>
                        </ul>
                    </section>

                    {/* SCHEDULE */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 text-red-500">SCHEDULE - 1</h2>
                        <p>
                            Please click{" "}
                            <a
                                href="https://nirapodparcel.com/service-areas"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-500 underline"
                            >
                                here
                            </a>{" "}
                            to get the list of serviceable areas of Nirapod Parcel.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;