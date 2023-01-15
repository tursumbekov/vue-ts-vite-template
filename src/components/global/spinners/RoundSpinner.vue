<template>
    <div class="body">
        <div :class="[size]">
            <div
                v-for="index in circles"
                :key="index"
            >
                <span></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { ElementSizes } from '@/@enums';

export default defineComponent({
    name: 'RoundSpinner',
    props: {
        size: {
            type: String as PropType<ElementSizes>,
            default: ElementSizes.L,
        },
    },
    data() {
        return {
            circles: 4,
        };
    },
});
</script>

<style lang="scss" scoped>
// If you need to add new themes you can put it here
$themes-list: ('light' $shs $spring-green $prussian-blue, 'dark' $shs $spring-green-dark $prussian-blue);

@mixin rotate($offset) {
    50% {
        transform: rotate(360deg);
        margin-left: 0;
    }
    50.0001%,
    100% {
        margin-left: -$offset;
    }
}

@mixin drop1($translateX, $translateY) {
    100% {
        transform: translate($translateX, $translateY) scale(0);
    }
}

@mixin drop2($translateX, $translateY) {
    0% {
        transform: translate(0, 0) scale(0.9);
    }
    100% {
        transform: translate($translateX, -$translateY) scale(0);
    }
}

@mixin moveRoundSpinner($offset, $colorRight, $colorLeft) {
    0%,
    50% {
        left: -$offset;
    }
    25% {
        background: $colorRight;
    }
    75% {
        background: $colorLeft;
    }
    50.0001%,
    100% {
        left: auto;
        right: -$offset;
    }
}

@mixin roundSpinner(
    $themes,
    $size: 'l-size',
    $width: 120px,
    $height: 60px,
    $offset-double: 32px,
    $offset: 16px,
    $offset-small: 14px,
    $offset-half: 8px,
    $middle-bubble-margin: 7px
) {
    position: relative;
    width: $width;
    height: $height;
    margin: $offset;
    div,
    span {
        position: absolute;
    }
    div {
        top: 0;
        left: 50%;
        width: $height;
        height: $height;
        animation: rotate-#{$size}-default 6.9s linear infinite;

        span {
            left: -$offset-half;
            top: 50%;
            margin: -$offset-half 0 0 0;
            width: $offset;
            height: $offset;
            display: block;
            border-radius: 50%;
            transform: rotate(90deg);
            background: $prussian-blue;
            box-shadow: 2px 2px $offset-half rgba($prussian-blue, 0.09);
            animation: move-#{$size}-default 6.9s linear infinite;

            &:before,
            &:after {
                content: '';
                position: absolute;
                display: block;
                border-radius: 50%;
                width: $offset-small;
                height: $offset-small;
                background: inherit;
                top: 50%;
                left: 50%;
                margin: -#{$middle-bubble-margin} 0 0 -#{$middle-bubble-margin};
                box-shadow: inherit;
            }

            &:before {
                animation: drop1-#{$size}-default 0.8s linear infinite;
            }

            &:after {
                animation: drop2-#{$size}-default 0.8s linear infinite 0.4s;
            }

            @each $themeName, $colorRight, $colorLeft, $color in $themes {
                .v-theme--#{$themeName} & {
                    animation-delay: 0s;
                    animation: move-#{$size}-#{$themeName} 6.9s linear infinite;

                    &:before {
                        animation: drop1-#{$size}-#{$themeName} 0.8s linear infinite;
                    }

                    &:after {
                        animation: drop2-#{$size}-#{$themeName} 0.8s linear infinite 0.4s;
                    }
                }
            }
        }

        &:nth-child(2) {
            animation-delay: -2.3s;

            span {
                animation-delay: -2.3s;
            }
        }

        &:nth-child(3) {
            animation-delay: -4.6s;

            span {
                animation-delay: -4.6s;
            }
        }

        @each $themeName, $colorRight, $colorLeft, $color in $themes {
            .v-theme--#{$themeName} & {
                animation: rotate-#{$size}-#{$themeName} 6.9s linear infinite;

                &:nth-child(2) {
                    animation-delay: -2.3s;

                    span {
                        animation-delay: -2.3s;
                    }
                }

                &:nth-child(3) {
                    animation-delay: -4.6s;

                    span {
                        animation-delay: -4.6s;
                    }
                }
            }
        }
    }

    $move: $offset-half;
    $drop: $offset-double;

    @keyframes rotate-#{$size}-default {
        50% {
            transform: rotate(360deg);
            margin-left: 0;
        }
        50.0001%,
        100% {
            margin-left: -$height;
        }
    }

    @keyframes drop1-#{$size}-default {
        @include drop1($drop, $move);
    }

    @keyframes drop2-#{$size}-default {
        @include drop2($drop, $move);
    }

    @keyframes move-#{$size}-default {
        @include moveRoundSpinner($move, $shs, $spring-green);
    }

    @each $themeName, $colorRight, $colorLeft, $color in $themes {
        @keyframes rotate-#{$size}-#{$themeName} {
            @include rotate($height);
        }

        @keyframes drop1-#{$size}-#{$themeName} {
            @include drop1($drop, $move);
        }

        @keyframes drop2-#{$size}-#{$themeName} {
            @include drop2($drop, $move);
        }

        @keyframes move-#{$size}-#{$themeName} {
            @include moveRoundSpinner($move, $colorRight, $colorLeft);
        }
    }
}

.l-size {
    @include roundSpinner($themes: $themes-list);
}

.m-size {
    @include roundSpinner(
        $themes: $themes-list,
        $size: 'm-size',
        $width: 60px,
        $height: 30px,
        $offset-double: 16px,
        $offset: 8px,
        $offset-small: 7px,
        $offset-half: 4px,
        $middle-bubble-margin: 3px
    );
}
</style>
