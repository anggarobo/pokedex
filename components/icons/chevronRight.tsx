import { SVGProps } from "react";

function ChevronRight(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="chevron-right" height={props.height ?? "24px"} width={props.width ?? "24px"} ><g data-name="Layer 2"><g data-name="chevron-right"><rect width="24" height="24" opacity="0" transform="rotate(-90 12 12)"></rect><path d="M10.5 17a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42L13.1 12 9.92 8.69a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32z"></path></g></g></svg>
    );
}

export default ChevronRight;